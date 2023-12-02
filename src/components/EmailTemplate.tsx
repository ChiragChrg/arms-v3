import React from 'react';

type EmailTemplateProps = {
    username: string,
    email: string,
    resetLink: string
}

const EmailTemplate = ({ username, email, resetLink }: EmailTemplateProps) => {
    const styles = {
        container: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '1.5em',
            textAlign: 'center',
        } as React.CSSProperties,
        greeting: {
            fontSize: '1.1em',
            fontWeight: 'bold',
            marginBottom: '0.8em',
        },
        emailDisplay: {
            marginBottom: '1.4em',
        },
        link: {
            backgroundColor: 'rgb(45, 101, 206)',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Reset Password</h2>
            <p style={styles.greeting}>Hello, {username}!</p>
            <p style={styles.emailDisplay}>We have sent a password reset link to {email}.</p>
            <a href={resetLink} target='_blank' style={styles.link}>Reset Password</a>
        </div>
    );
};

export default EmailTemplate;
