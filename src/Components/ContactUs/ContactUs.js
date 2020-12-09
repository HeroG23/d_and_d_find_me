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
    
      handleSend = () => {
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
        const { name, email, message, title,image } = this.state
        return (
          <div className="Email" style={styles.body}>
            <div className="email-form" style={styles.form}>
              <h1 className="email-header" style={styles.header}>Contact Us</h1>
              <input style={styles.input} placeholder='title' type="text" name='title' value={title} onChange={this.handleInput} />
              <input style={styles.input} placeholder='name' type="text" name='name' value={name} onChange={this.handleInput} />
              <input style={styles.input} placeholder='email' type="text" name='email' value={email} onChange={this.handleInput} />
              <input style={styles.input} placeholder='message' type="text" name='message' value={message} onChange={this.handleInput} />
              <button style={styles.button} onClick={this.handleSend}>Send</button>
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
          width:500,
          alignItems:'center',
          height:500,
          justifyContent:'space-evenly',
          borderRadius:10
        },
        header:{
          fontSize:60,
          margin:0,
          color:'black',
          letterSpacing:'0.07em',
          fontWeight:'bold'
        },
        input:{
          width:450,
          height:50,
          fontSize:35,
          outline:'none'
        },
        button:{
          width:200,
          height:45,
          borderRadius:10,
          background:'green',
          fontSize:35,
          fontWeight:'bold',
          letterSpacing:'0.07em'
        }
      }   



export default Email