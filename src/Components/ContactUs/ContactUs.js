import axios from "axios";
import { Component } from "react";

class Email extends Component {
    constructor() {
        super()
        this.state = {
          name: '',
          email: '',
          title: '',
          message: '',
        }
      }
    
      handleInput = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })
      }
    
      handleSend = (e) => {
        e.preventDefault();
        const { name, email, message, title} = this.state
        axios.post('/api/email', { name, email, message, title }).then(res => {
          this.setState({
            name: '',
            email: '',
            title: '',
            message: '',
          })
        })
      }
    
      render() {
        const { name, email, message, title } = this.state
        return (
          <div style={styles.body}>
            <div style={styles.form}>
              <h1 style={styles.header}>Contact Us</h1>
              <input style={styles.input} placeholder='title' type="text" name='title' value={title} onChange={this.handleInput} />
              <input style={styles.input} placeholder='name' type="text" name='name' value={name} onChange={this.handleInput} />
              <input style={styles.input} placeholder='email' type="text" name='email' value={email} onChange={this.handleInput} />
              <input style={styles.input} placeholder='message' type="text" name='message' value={message} onChange={this.handleInput} />
              <button style={styles.button} onClick={e => this.handleSend(e)}>Send</button>
            </div>
          </div>
        )
      }
    }
    const styles = {
        body:{
          height:'100vh',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        },
        form:{
          display:'flex',
          flexDirection:'column',
          background:'rgba(255, 255, 255, 0.452)',
          width:300,
          alignItems:'center',
          height:300,
          justifyContent:'space-evenly',
          borderRadius:10
        },
        header:{
          fontSize:30,
          margin:0,
          color:'black',
          letterSpacing:'0.07em',
          fontWeight:'700'
        },
        input:{
          width:225,
          height:25,
          fontSize:20,
          color: "white",
          backgroundColor:"rgba(0, 0, 0, 0.648)",
          outline:'none'
        },
        button:{
          width:100,
          height:22.5,
          borderRadius:10,
          background:'green',
          fontSize:17.5,
          fontWeight:'bold',
          letterSpacing:'0.07em'
        }
      }   



export default Email