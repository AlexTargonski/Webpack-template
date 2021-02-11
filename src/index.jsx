import React from 'react';
import { render } from 'react-dom';
import * as $ from 'jquery';
import Post from "./Post";
import './styles/styles.css';
import './styles/less.less';
import './styles/sass.scss';
import Logo from './assets/webpack.png';

const App = () => (
  <div className="container">
    <h1>Welcome!</h1>
    <div className="content">
    <div className="logo"></div>
      <p>
        Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry. Lorem Ipsum has been 
        the industry's standard dummy text ever since the 
        1500s, when an unknown printer took a galley of type 
        and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also 
        the leap into electronic typesetting, remaining 
        essentially unchanged. It was popularised in the 
        1960s with the release of Letraset sheets containing 
        Lorem Ipsum passages, and more recently with desktop 
        publishing software like Aldus PageMaker 
        including versions of Lorem Ipsum.
      </p>
      <hr />
      <code></code>
      <div className="box">
        Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry. Lorem Ipsum has been 
        the industry's standard dummy text ever since the 
        1500s, when an unknown printer took a galley of type 
        and scrambled it to make a type specimen book.
      </div>
      <div className="card">
        <h2>Lorem Ipsum</h2>
        Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry. Lorem Ipsum has been 
        the industry's standard dummy text ever since the 
        1500s, when an unknown printer took a galley of type 
        and scrambled it to make a type specimen book.
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById("root"));


const post = new Post('webpack', Logo);

$('code').html(post.toString());

console.log(post.toString());
console.log(post.postTitle);