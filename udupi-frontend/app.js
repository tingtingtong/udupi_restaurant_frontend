// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    Alert.alert('User registered successfully');
  };

  const handleLogin = async () => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    setToken(response.data.token);
  };

  const handleAddItem = async () => {
    await axios.post('http://localhost:5000/api/inventory/add', { itemName, quantity, unit }, {
      headers: { 'Authorization': token }
    });
    Alert.alert('Item added to inventory');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Udupi Restaurant Inventory Management</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />

      <TextInput placeholder="Item Name" value={itemName} onChangeText={setItemName} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput placeholder="Unit" value={unit} onChangeText={setUnit} />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}
    