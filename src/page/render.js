import React from 'react';
import Page from './Page';
import { renderToString } from 'react-dom/server';

const html = ({ body, title }) => `
  <!doctype html>
  <html lang="sl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <style>
        body {
            font-family: 'Roboto', sans-serif;
        }
        
        th, td {
            padding: 0 8px;
            text-align: left;
        }
        
        .discarded {
            text-decoration: line-through;
        }
      </style>
    </head>      
    <body>
      <div id="app">${body}</div>
    </body>
  </html>
`;

const renderPage = (props) => {
  const body = renderToString(<Page {...props} />);
  return html({ body, title: props.title });
};

export default renderPage;
