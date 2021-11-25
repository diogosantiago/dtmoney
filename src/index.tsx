import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          name: 'Desenvolvimento de site',
          amount: 12000,
          type: 'deposit',
          category: 'Desenvolvimento',
          createdAt: new Date('2021-02-28')
        },
        {
          id: 2,
          name: 'Aluguel',
          amount: 1500,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-07-08')
        },
        {
          id: 3,
          name: 'Desenvolvimento de site 2',
          amount: 8000,
          type: 'deposit',
          category: 'Desenvolvimento',
          createdAt: new Date('2021-11-22')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);