import React, { useState, useEffect } from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }
];


const App = () => {
  const [productList, setProductList] = useState(initialProductList)
  const [totalPriceList, setTotalPriceList] = useState(initialProductList.map(product => product.price * product.quantity))
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')


  const addQuantity = e => {
    if (e.target.value === "0" || e.target.value === "") {
      if (window.confirm("Etes-vous sûr de bien vouloir retirer ce produit de la liste ?")) {
        let arr = [...productList]
        let row = arr.find(f => f.id === parseInt(e.target.id))
        arr = arr.filter(f => f !== row)
        setProductList(arr)
      } else {
        setProductList(productList)
      }
    } else {
      let newArr = [...productList]
      let row = newArr.find(f => f.id === parseInt(e.target.id))
      newArr[newArr.indexOf(row)].quantity = parseInt(e.target.value)
      setProductList(newArr)
      setTotalPriceList(newArr.map(product => product.price * product.quantity))
    }
  }

  const addProduct = (e) => {
    e.preventDefault();
    const idList = productList.map(p => (p.id))
    const maxId = idList.reduce((prev, current) => (prev > current) ? prev : current)
    setProductList([...productList, { id: maxId + 1, name: newProductName, price: parseInt(newProductPrice), quantity: 1 }])

  }

  useEffect(() =>
    setTotalPriceList(productList.map(product => product.price * product.quantity)),
    [productList])

  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} €</td>
              <td><input id={product.id} type="number" value={product.quantity} onChange={addQuantity} /></td>
              <td>{product.quantity * product.price}</td>
            </tr>)}
        </tbody>
      </table>
      <p>Montant de la commande: <span style={{ fontWeight: 'bold' }}>
        {totalPriceList.reduce((accumulator, currentValue) => accumulator + currentValue)} €</span></p>
      <form onSubmit={addProduct}>
        <h2>Ajouter un produit</h2>
        <div className="field">
          Nom
          <input type="textarea" name="name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} required/>
        </div>
        <div className="field">
          Prix
          <input type="number" name="price" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} required/>
        </div>
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  );
}

export default App;
