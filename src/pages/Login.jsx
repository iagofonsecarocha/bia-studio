import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            if (isSignUp) {
                await signUp(email, password);
                setMessage('Cadastro realizado! Verifique seu email para confirmar a conta.');
                setIsSignUp(false);
            } else {
                await login(email, password);
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Ocorreu um erro. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'var(--color-background)'
        }}>
            <Card padding="32px" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ color: 'var(--color-primary)', margin: '0 0 8px 0' }}>Bia Studio</h1>
                    <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                        {isSignUp ? 'Crie sua conta' : 'Bem-vinda de volta'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '12px',
                        background: '#FFEBEE',
                        color: 'var(--color-danger)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        padding: '12px',
                        background: '#E8F5E9',
                        color: 'var(--color-success)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="seu@email.com"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? 'Carregando...' : (isSignUp ? 'Cadastrar' : 'Entrar')}
                    </Button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: '#666' }}>
                        {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                    </span>
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setMessage('');
                        }}
                        style={{
                            marginLeft: '8px',
                            color: 'var(--color-primary)',
                            fontWeight: '600',
                            textDecoration: 'underline'
                        }}
                    >
                        {isSignUp ? 'Entrar' : 'Cadastre-se'}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Login;
