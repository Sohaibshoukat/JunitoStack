const express = require("express");
const axios = require('axios');
const router = express.Router();
const fetchuser = require('../../Middleware/Fetchuser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../Models/User");
const Chat = require("../../Models/Chat");
const Company = require("../../Models/Company");
const SharedChat = require("../../Models/SharedChat");
const SubUser = require("../../Models/SubUser");
const ToDos = require("../../Models/ToDos");

const OpenAI = require('openai');
const pythonServerURL = "http://127.0.0.1:8000";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


function fillChatDetails(message) {
    var placeholders = message.match(/\[(.*?)\]/g);
    placeholders = Array.from(new Set(placeholders))
    if (placeholders) {
        //TODO: Get these values from the database
        const accountDetails = {
            name: "John Doe",
            company: "Acme Inc.",
            email: "john.doe@acme.com",
            noofemployees: 250,
            companyaddress: "123 Main St, Cityville, State 12345",
            companydesc: "Acme Inc. is a leading provider of innovative solutions for the widget industry.",
            department: "Sales and Marketing",
            product: "Super Widget 3000",
            targetcustomers: "Manufacturing companies, construction firms, and automotive industry",
            companystructure: "Hierarchical with CEO, VPs, Directors, and team leads",
            regulations: "Compliant with industry standards and local regulations",
            customerquestions: "How does the product work? What are the pricing options? What kind of support is available?",
            communicationchannels: "Email, phone, website, social media",
            feedbackmethod: "Online surveys, customer support interactions, focus groups",
            date: new Date().toISOString().split('T')[0],
            year: new Date().getFullYear()
        };

        let filledMsg = message;
        placeholders.forEach((placeholder) => {
            const key = placeholder.substring(1, placeholder.length - 1).toLowerCase().replace(" ", "").replace("_", "");
            if (accountDetails[key] !== undefined) {
                filledMsg = filledMsg.replaceAll(placeholder, accountDetails[key]);
            }
        });
        return filledMsg;
    } else {
        return message;
    }
}

router.post('/upload-document', async (req, res) => {
    // TODO: Upload the document to the server
});


router.post('/ask', async (req, res) => {
    try {
        const chatDetails = req.body;
        const response = await axios.post(`${pythonServerURL}/chat`, chatDetails);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/fillPlaceholders", async (req, res) => {
    let query = req.body.message;

    try {
        const messages = [
            {role: "system", content: `You are an assistant that maps the placeholders in the given prompt to placholders from this list 
                                            [name, company, email, noofemployees, companyaddress, companydesc, department, product, targetcustomers, 
                                            companystructure, regulations, customerquestions, communicationchannels, feedbackmethod, date, year].
                                            Placeholder are enclosed in square brackets. If a placeholder is not in the list, you should ignore it.  
                                            Do NOT answer the question, just reformulate it if needed and otherwise return it as is.` },
            { role: "user", content: query }
        ];
        const completions = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });
        const message = completions.choices[0].message.content; 
        const filledMsg = fillChatDetails(message);
        res.status(200).json({ filledMessage: filledMsg });

        
    } catch (error) {
        console.error(error);
    }
});

// deleting documents
router.post('/delete-document', async (req, res) => {
    try {
        const filename = req.body.file_name;
        const response = await axios.post(`${pythonServerURL}/delete-document`, { file_name: filename });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/chathistory', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const data = await Chat.find({ User_ID: req.user.id }, { Title: 1, Date: 1, Department: 1 })
            .sort({ Date: -1 })
            .limit(10);

        res.send({ success: true, Chats: data });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/chatdetail/:chatId', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const chatId = req.params.chatId;

        // Fetch the chat details along with user details
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        res.send({ success: true, Chat: chat });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/createnewchat', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const { Title, Department, ChatConversation } = req.body;

        const newChat = new Chat({
            Title,
            User_ID: req.user.id,
            Department,
            ChatConversation
        });

        await newChat.save();

        res.status(201).json({ success: true, message: "Chat created successfully", Chat: newChat });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:chatId/addchat', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const chatId = req.params.chatId;
        const { Type, Query } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        chat.ChatConversation.push({ Type, Query });

        await chat.save();

        res.status(200).json({ success: true, message: "New chat added successfully", Chat: chat });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/chat/deleteall', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        // Delete all chats for the user
        await Chat.deleteMany({ User_ID: req.user.id });

        res.status(200).json({ success: true, message: "All chat history deleted successfully" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/chat/:chatId/delete', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const chatId = req.params.chatId;

        // Find the chat by its ID
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Check if the chat belongs to the authenticated user
        if (chat.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to delete this chat" });
        }

        // Delete the chat
        await chat.remove();

        res.status(200).json({ success: true, message: "Chat deleted successfully" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/chat/:chatId/rename', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const chatId = req.params.chatId;
        const { newTitle } = req.body;

        // Find the chat by its ID
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Check if the chat belongs to the authenticated user
        if (chat.User_ID.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You do not have permission to rename this chat" });
        }

        // Update the chat title
        chat.Title = newTitle;

        // Save the updated chat
        await chat.save();

        res.status(200).json({ success: true, message: "Chat title renamed successfully", Chat: chat });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


// Shared Chat
router.post('/chat/share', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        let company = await Company.findOne({ Owner_ID: userId });
        if (!company) {
            let subuser = await SubUser.findOne({ Own_ID: userId });
            if (!subuser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            company = await Company.findById(subuser.Company_ID);
            if (!company) {
                return res.status(404).json({ success: false, message: "Company not found" });
            }
        }

        const { chatId } = req.body;


        // Check if the provided chat ID is valid
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Create a new shared chat document
        const sharedChat = await SharedChat.create({
            User_ID: req.user.id,
            Company: company._id,
            Chat_id: chatId
        });


        res.status(201).json({ success: true, message: "Chat shared with company successfully", SharedChat: sharedChat });

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
});

router.get('/sharedChats', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        let company = await Company.findOne({ Owner_ID: userId });
        if (!company) {
            let subuser = await SubUser.findOne({ Own_ID: userId });
            if (!subuser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            company = await Company.findById(subuser.Company_ID);
            if (!company) {
                return res.status(404).json({ success: false, message: "Company not found" });
            }
        }

        // Check if the user is authorized to access shared chats for this company
        if (user._id.toString() !== company.Owner_ID.toString()) {
            return res.status(403).json({ success: false, message: "You do not have permission to access shared chats for this company" });
        }

        // Fetch shared chats for the company and populate Chat details
        const sharedChats = await SharedChat.find({ Company: company._id }).populate('Chat_id', 'Title Department ChatConversation');

        res.status(200).json({ success: true, sharedChats });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/Sahredchat/:sharedid', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const sharedid = req.params.chatId;

        const sharedchat = await SharedChat.findById(sharedid);
        if (!sharedchat) {
            return res.status(404).json({ success: false, message: "No Shared Chat found" });
        }

        const chat = await Chat.findById(sharedchat.Chat_id);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        if (sharedchat.User_ID.toString() == req.user.id) {
            return res.send({ success: true, Chat: chat, Type: "Owned" });
        }

        res.send({ success: true, Chat: chat, Type: "Shared" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/sharedChat/:sharedChatId', fetchuser, async (req, res) => {
    try {
        const sharedChatId = req.params.sharedChatId;
        const userId = req.user.id;

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        // Find the shared chat by its ID
        const sharedChat = await SharedChat.findById(sharedChatId);

        if (!sharedChat) {
            return res.status(404).json({ success: false, message: "Shared chat not found" });
        }

        // Check if the authenticated user is the owner of the shared chat
        if (sharedChat.User_ID.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You do not have permission to delete this shared chat" });
        }

        // Delete the shared chat
        await sharedChat.remove();

        res.status(200).json({ success: true, message: "Shared chat deleted successfully" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});




//ToDos
router.post('/todos/add', fetchuser, async (req, res) => {
    try {
        const { Title, Description, Priority, Deadline, subUsers, chatId } = req.body;
        const userId = req.user.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if company exists
        let company = await Company.findOne({ Owner_ID: userId });
        if (!company) {
            let subuser = await SubUser.findOne({ Own_ID: userId });
            if (!subuser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            company = await Company.findById(subuser.Company_ID);
            if (!company) {
                return res.status(404).json({ success: false, message: "Company not found" });
            }
        }

        // Check if chat exists
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Check if user is authorized to add a ToDo for this chat
        if (chat.User_ID.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You do not have permission to add a ToDo for this chat" });
        }

        // Create a new ToDo
        const newToDo = new ToDos({
            Title,
            Description,
            Priority,
            Deadline,
            subUsers,
            User_ID: userId,
            Company: company._id,
            Chat_id: chatId,
            Status: "Pending"
        });

        // Save the new ToDo
        await newToDo.save();

        res.status(201).json({ success: true, message: "ToDo added successfully", ToDo: newToDo });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/todos', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find ToDos where the user is the creator or listed in subUsers
        const todos = await ToDos.find({
            $or: [
                { User_ID: userId }, // User created the ToDo
                { subUsers: userId } // User is listed in the subUsers array
            ]
        }).populate({
            path: 'subUsers',
            select: 'FirstName LastName ProfilePhoto', // Only select firstName and lastName fields
            model: 'User' // The model to use for populating
        })

        res.status(200).json({ success: true, todos })

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/todos/List', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find ToDos where the user is the creator or listed in subUsers
        const todos = await ToDos.find({
            $or: [
                { User_ID: userId }, // User created the ToDo
                { subUsers: userId } // User is listed in the subUsers array
            ]
        }).populate({
            path: 'subUsers',
            select: 'FirstName LastName ProfilePhoto',
            model: 'User'
        })
            .sort({ Date: -1 })
            .limit(5);

        res.status(200).json({ success: true, todos })

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/todos/:todoId', fetchuser, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user.id;

        // Find the ToDo by its ID and check if the user is authorized to access it
        const todo = await ToDos.findOne({ _id: todoId, $or: [{ User_ID: userId }, { subUsers: userId }] });

        if (!todo) {
            return res.status(404).json({ success: false, message: "ToDo not found or you do not have permission to access it" });
        }

        res.status(200).json({ success: true, todo });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/todos/:todoId/chat', fetchuser, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user.id;

        // Find the ToDo by its ID and check if the user is authorized to access it
        const todo = await ToDos.findOne({ _id: todoId, $or: [{ User_ID: userId }, { subUsers: userId }] });

        if (!todo) {
            return res.status(404).json({ success: false, message: "ToDo not found or you do not have permission to access it" });
        }

        // If ToDo is found, fetch the chat details
        const chatId = todo.Chat_id;
        if (!chatId) {
            return res.status(404).json({ success: false, message: "Chat not found for this ToDo" });
        }

        // Fetch the chat details
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        if (chat.User_ID.toString() == req.user.id) {
            return res.send({ success: true, Chat: chat, Type: "Owned" });
        }

        res.status(200).json({ success: true, Chat: chat, Type: "Shared" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/todos/:todoId/complete', fetchuser, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user.id;

        // Find the ToDo by its ID and check if the user is authorized to access it
        const todo = await ToDos.findOne({ _id: todoId, $or: [{ User_ID: userId }, { subUsers: userId }] });

        if (!todo) {
            return res.status(404).json({ success: false, message: "ToDo not found or you do not have permission to access it" });
        }

        // Update the status of the ToDo to "Completed"
        todo.Status = "Completed";

        // Save the updated ToDo
        await todo.save();

        res.status(200).json({ success: true, message: "ToDo status updated to 'Completed'", todo });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/todos/:todoId', fetchuser, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user.id;

        // Find the ToDo by its ID
        let todo = await ToDos.findById(todoId);

        if (!todo) {
            return res.status(404).json({ success: false, message: "ToDo not found" });
        }

        // Check if the authenticated user is the creator of the ToDo
        if (todo.User_ID.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You do not have permission to delete this ToDo" });
        }

        // Delete the ToDo
        todo = await ToDos.findByIdAndDelete(todoId);


        res.status(200).json({ success: true, message: "ToDo deleted successfully" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router