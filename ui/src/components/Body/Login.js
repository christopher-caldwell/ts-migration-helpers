import React from 'react';

class Login extends React.Component{

    render(){

        return (
            <div className='container login-main'>
                <form action="/api/form" method="POST">
                    <div className="user-container">
                        <div>
                            <label htmlFor="username">Username:</label>
                        </div>
                        <div>
                            <input type="text" placeholder="NerfHerder23" id='username' required/>
                        </div>
                    </div>
                    <div className="pass-container">
                        <div>
                            <label htmlFor="password">Password:</label>
                        </div>
                        <div>
                            <input type="password" required id='password'/>
                        </div>
                    </div>
                    <button className="login-button">Log In</button>
                </form>
            </div>
        )
    }
}
export default Login;