import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, cleanUpAuth } from '../../actions/auth';
import { cleanUp } from '../../actions/errors'
import { Alerts } from '../../components';

const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'visible',
    },
    session: {
        position: 'relative',
        zIndex: 4000,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    background: {
        backgroundColor: theme.palette.primary.main,
    },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 0 auto',
        flexDirection: 'column',
        minHeight: '100%',
        textAlign: 'center',
    },
    wrapper: {
        flex: 'none',
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
    },
    fullWidth: {
        width: '100%',
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
let type;
let text;
const Signin = (props) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [alert, setAlert] = useState({ state: false });
    console.log('the alert', alert)
    const onChange = (e) => {
        e.persist();
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const { error, success, history } = props;
    useEffect(() => {
      console.log('the errors', error)
        if (error.error) {
            if (Array.isArray(error.message.message)) {
                let text_ = 'Issues: ';
                console.log('the text_ >>>', text_);
                for (let i = 0; i < error.message.message.length; i += 1) {
                    text_ +=
                        ', No. ' + i + ': ' + error.message.message[i].message;
                }
                text = text_;
                type = 'error';
                console.log('the error text >>>>>', text);
                setAlert({ state: true });

                setTimeout(() => {
                    setAlert({ state: false });
                }, 6000);
            } else {
                setAlert({ state: true });
                text = error.message.error || error.message.message;
                type = 'error';

                setTimeout(() => {
                    setAlert({ state: false });
                }, 6000);
            }
            return () => {
                props.cleanUp_();
            };
        }
        if (success.status !== null && success.message) {
            setAlert({ state: true });
            text = success.message.message;
            type = 'success';

            setTimeout(() => {
                history && history.push('/parties/list-party');
                setAlert({ state: false });
            }, 2000);
            return () => {
                props.cleanUp_();
            };
        }
    }, [success, error]);
    const submit = (e) => {
        e.preventDefault();
        console.log('the values', values);
        props.login(values);
    };
    console.log('the props', props);
    const classes = useStyles();
    if (props.auth.isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    {alert.state ? (
                        <Alerts text={text} type={type} open={true} position="center" />
                    ) : (
                        ''
                    )}
                    <Card>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div
                                    className={classNames(
                                        classes.logo,
                                        `text-xs-center pb-xs`
                                    )}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                                        alt=""
                                        className="block"
                                    />
                                    <Typography variant="caption">
                                        Sign in with your app id to continue.
                                    </Typography>
                                </div>
                                <TextField
                                    id="username"
                                    label="Username"
                                    name="email"
                                    className={classes.textField}
                                    fullWidth
                                    onChange={onChange}
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    name="password"
                                    className={classes.textField}
                                    type="password"
                                    fullWidth
                                    onChange={onChange}
                                    margin="normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="checkedA" />}
                                    label="Stayed logged in"
                                    className={classes.fullWidth}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Login
                                </Button>
                                <div className="pt-1 text-md-center">
                                    <Link to="/forgot">
                                        <Button>Forgot password?</Button>
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to="/signup">
                                        <Button>Create new account.</Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.errors,
    success: state.success,
});

export const cleanUp_ = () => cleanUp();

export default connect(mapStateToProps, { login, cleanUpAuth, cleanUp_ })(Signin);
