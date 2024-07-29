print('Creating user...');
db.createUser({
  user: 'thomas_1001',
  pwd: 'UIOJKL',
  roles: [
    {
      role: 'readWrite',
      db: 'Junito'
    }
  ]
});
print('User created.');
