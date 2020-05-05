import React, {useState} from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }
];

const App = () => {
  const [productList, setProductList] = useState(initialProductList)
  const [totalPriceList, setTotalPriceList] = useState(initialProductList.map(product => product.price * product.quantity))
  
  const addQuantity = e => {
    if (e.target.value === "0" || e.target.value === "") {
      if (window.confirm("Etes-vous sûr de bien vouloir retirer ce produit de la liste ?")) {
        let arr = [...productList]
        let row = arr.find(f => f.id == e.target.name)
        arr = arr.filter(f => f != row)
         setProductList(arr)
      } else {
        setProductList(productList)
      }
    } else {
    let newArr = [...productList]
    newArr[e.target.id -1].quantity = e.target.value
    setProductList(newArr)
    setTotalPriceList(newArr.map(product => product.price * product.quantity))
    }
  }
  
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
            <td><input name={product.id} type="number" value={product.quantity} onChange={addQuantity}/></td>
            <td>{product.quantity * product.price}</td>
          </tr>)}
        </tbody>
      </table>
          <p>Montant de la commande: {totalPriceList.reduce((accumulator, currentValue) => accumulator + currentValue
)}</p>
    </div>
  );
}

export default App;
