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
const nodemailer = require('nodemailer');
const fs = require('fs');
const FormData = require('form-data');

const OpenAI = require('openai');
const multer = require("multer");
const Prompts = require("../../Models/Prompts");
const pythonServerURL = "https://bizbot.junito.at";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const FileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/Uploads/ProfilePhoto/User');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const FileUploader = multer({ storage: FileStorage });

const transporter = nodemailer.createTransport({
    host: "smtp.world4you.com",
    port: 587, // Use port 587 for STARTTLS or 465 for SSL
    secure: false,
    auth: {
        user: "no-reply@junito.at",
        pass: "Scott691980!", 
    }
});


async function fillChatDetails(message, user_id, department) {
    var placeholders = message.match(/\[(.*?)\]/g);
    placeholders = Array.from(new Set(placeholders))
    if (placeholders) {
        const user = await User.findById({ _id: user_id });
        const company = await Company.findOne({ Owner_ID: user_id });
        if (!company) {
            let subuser = await SubUser.findOne({ Own_ID: user_id });
            if (!subuser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            company = await Company.findById(subuser.Company_ID);
            if (!company) {
                return res.status(404).json({ success: false, message: "Company not found" });
            }
        }


        const accountDetails = {
            name: `${user?.FirstName} ${user?.LastName}`,
            company: company?.CompanyName,
            email: company?.ContactEmail,
            noofemployees: company?.NumEmployee,
            companyaddress: company?.Address,
            companydesc: company?.CompanyMoto,
            department: department,
            product: company?.CompanySell,
            targetcustomers: company?.Customers,
            companystructure: company?.Struture,
            regulations: company?.rules,
            customerquestions: company?.questions,
            communicationchannels: company?.communication,
            feedbackmethod: company?.feedback,
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

router.post('/upload-document', FileUploader.single('fileup'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileName = req.file.originalname;

        // Prepare the form data
        const form = new FormData();
        form.append('file_content', fs.createReadStream(filePath), fileName);

        // Post the file to the Python API
        const response = await axios.post(`${pythonServerURL}/upload-document`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        // Send the response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/ask',fetchuser, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const chatDetails = req.body;
        const response = await axios.post(`${pythonServerURL}/chat`, chatDetails);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/searchsuggestion',fetchuser, async (req, res) => {
    try {

        const user = await User.findById({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const chatDetails = req.body;
        const query = chatDetails.data;
        if (!query) {
          return res.status(400).send('Query parameter is required');
        }
    
        const suggestions = await Prompts.find({
          PromptsList: { 
            $elemMatch: { 
              value: { $regex: query, $options: 'i' } 
            } 
          }
        })
        .limit(5)
        .select({ 'PromptsList.$': 1 }) // Selects only the matching elements of PromptsList
        .exec();

        if (suggestions.length > 0) {
            const formattedSuggestions = suggestions.reduce((acc, curr, index) => {
                acc[`query${index + 1}`] = curr.PromptsList[0].value;
                return acc;
            }, {});
            return res.status(200).json(formattedSuggestions);
        }

        const response = await axios.post(`${pythonServerURL}/searchQuery`, chatDetails);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/fillPlaceholders", fetchuser, async (req, res) => {
    let query = req.body.message;
    let department = req.body.department;

    let user_id = req.user.id;
    try {
        const messages = [
            {
                role: "system", content: `You are an assistant that maps the placeholders in the given prompt to placholders from this list 
                                            [name, company, email, noofemployees, companyaddress, companydesc, department, product, targetcustomers, 
                                            companystructure, regulations, customerquestions, communicationchannels, feedbackmethod, date, year].
                                            Placeholder are enclosed in square brackets. If a placeholder is not in the list, you should ignore it.
                                            Wherever you find a placeholder replace it with one of the entities from the above list.
                                            Do NOT answer the question, just replace unknown placeholders with known placeholders if needed and otherwise return it as is.` },
            { role: "user", content: query }
        ];
        const completions = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });

        const message = completions.choices[0].message.content;
        const filledMsg = await fillChatDetails(message, user_id, department);
        res.status(200).json({ filledMessage: filledMsg });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
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
        console.log(error)
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
        const { Type, Query, Response } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        chat.ChatConversation.push({ Type, Query });
        chat.ChatConversation.push({ Type: "BizBot", Query: Response });

        await chat.save();

        res.status(200).json({ success: true, message: "New chat added successfully", Chat: chat });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:chatId/regenratechat', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const chatId = req.params.chatId;
        const { Response } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }


        chat.ChatConversation[chat?.ChatConversation?.length - 1] = { Type: "BizBot", Query: Response };

        await chat.save();

        res.status(200).json({ success: true, message: "BizBot response updated successfully", Chat: chat });

    } catch (error) {
        console.error(error); // Log the error for debugging
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

        const { chatId, Category } = req.body;


        // Check if the provided chat ID is valid
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Create a new shared chat document
        const sharedChat = await SharedChat.create({
            User_ID: req.user.id,
            Company: company._id,
            Chat_id: chatId,
            Category: Category
        });


        res.status(201).json({ success: true, message: "Chat shared with company successfully", SharedChat: sharedChat });

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
});

router.put('/editchat/share/:id', fetchuser, async (req, res) => {
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

        const { Category } = req.body;

        // Create a new shared chat document
        const sharedChat = await SharedChat.findById(req.params.id);

        sharedChat.Category = Category;

        sharedChat.save()


        res.status(201).json({ success: true, message: "Shared Chat Editied Successfully", SharedChat: sharedChat });

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

router.get('/sharedChatList', fetchuser, async (req, res) => {
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
        const sharedChats = await SharedChat.find({ Company: company._id })
            .populate('Chat_id', 'Title Department')
            .sort({ Date: -1 })
            .limit(5);

        res.status(200).json({ success: true, sharedChats });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/SahredID/:sharedid', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access" });
        }

        const sharedid = req.params.sharedid;

        const sharedchat = await SharedChat.findById(sharedid);
        if (!sharedchat) {
            return res.status(404).json({ success: false, message: "No Shared Chat found" });
        }

        res.send({ success: true, sharedchat: sharedchat });

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

        await SharedChat.findByIdAndDelete(sharedChatId);


        res.status(200).json({ success: true, message: "Shared chat deleted successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
});


const sendEmailContact = async (FirstName, Email, LastName, res) => {
    try {
        const mailOptions = {
            from: "no-reply@junito.at",
            to: Email,
            subject: `Added at Todo`,
            html: `
            <h1>Hi ${FirstName} ${LastName} </h1>
            <h3>You have been added to a TODO login to your account to check it out.</h>

            <a href="https://future.junito.at/login" target="_blank">Login to your Account</a>
`
        }

        await transporter.sendMail(mailOptions)

        return {
            status: True
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error.message,
        };
    }
}

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
        if (chatId) {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ success: false, message: "Chat not found" });
            }
            if (chat.User_ID.toString() !== userId) {
                return res.status(403).json({ success: false, message: "You do not have permission to add a ToDo for this chat" });
            }
        }

        await subUsers.map(async (item) => {
            let subuser = await User.findById(item).select('FirstName LastName Email')
            await sendEmailContact(subuser?.FirstName, subuser?.Email, subuser?.LastName)
        })

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
            Status: "Open"
        });

        // Save the new ToDo
        await newToDo.save();

        res.status(201).json({ success: true, message: "ToDo added successfully", ToDo: newToDo });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/todos/edit/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Description, Priority, Deadline, subUsers, chatId } = req.body;
        const userId = req.user.id;

        // Check if ToDo exists
        let todo = await ToDos.findById(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: "ToDo not found" });
        }

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
        if (chatId) {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ success: false, message: "Chat not found" });
            }
            if (chat.User_ID.toString() !== userId) {
                return res.status(403).json({ success: false, message: "You do not have permission to edit a ToDo for this chat" });
            }
        }

        // Check if the ToDo belongs to the user or the user's company
        if (todo.User_ID.toString() !== userId && todo.Company.toString() !== company._id.toString()) {
            return res.status(403).json({ success: false, message: "You do not have permission to edit this ToDo" });
        }

        // Update the subUsers and send email notifications
        if (subUsers) {
            await Promise.all(subUsers.map(async (item) => {
                let subuser = await User.findById(item).select('FirstName LastName Email');
                if (subuser) {
                    await sendEmailContact(subuser.FirstName, subuser.Email, subuser.LastName);
                }
            }));
        }

        // Update the ToDo
        todo.Title = Title || todo.Title;
        todo.Description = Description || todo.Description;
        todo.Priority = Priority || todo.Priority;
        todo.Deadline = Deadline || todo.Deadline;
        todo.subUsers = subUsers || todo.subUsers;
        todo.Chat_id = chatId || todo.Chat_id;

        // Save the updated ToDo
        await todo.save();

        res.status(200).json({ success: true, message: "ToDo updated successfully", ToDo: todo });

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
        todo.Status = "Done";

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