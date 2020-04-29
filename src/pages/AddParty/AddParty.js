import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import DescriptionIcon from '@material-ui/icons/Description';
import AppsIcon from '@material-ui/icons/Apps';
import EventIcon from '@material-ui/icons/Event';
import { addParty, cleanUp } from '../../actions/parties';
import { connect } from 'react-redux';
import { Alerts } from '../../components';

const styles = (theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    margin_: {
        marginTop: theme.spacing(4),
    },
    root: {
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    card: {
        position: 'relative',
        clear: 'both',
    },
    appBar: {
        boxShadow: theme.shadows[0],
    },
});
let type;
let text;
const Party = (props) => {
    const [values, setValues] = useState({
        name: '',
        bio: '',
        logo: '',
        established: '',
    });
    const [alert, setAlert] = useState({ state: false });
    console.log('the alert', alert);
    const onChange = (e) => {
        e.persist();
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        if (e.target.name == 'logo') {
            const [pictureFile] = e.target.files;
            setValues((prevState) => ({ ...prevState, logo: pictureFile }));
        }
    };
    const { classes, error, success, history } = props;
    console.log('the props', props);

    useEffect(() => {
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
        props.addParty(values);
    };

    return (
        <Card className={classes.card}>
            <AppBar
                position="static"
                color="default"
                className={classes.appBar}
            >
                <Toolbar>
                    {alert.state ? (
                        <Alerts text={text} type={type} open={true} />
                    ) : (
                        ''
                    )}
                    <Typography color="inherit" className="flexSpacer">
                        Add Party
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Enter Political Party Name
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Name"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name="name"
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Bio
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Bio"
                            name="bio"
                            onChange={onChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <DescriptionIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Year Established
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Year"
                            name="established"
                            onChange={onChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EventIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel>Party Logo</InputLabel>
                        <label htmlFor="upload-logo">
                            <Button component="span" className={classes.button}>
                                Select Party Image
                            </Button>
                        </label>
                        <Input
                            id="upload-logo"
                            placeholder="Logo"
                            accept="image/*"
                            type="file"
                            name="logo"
                            onChange={onChange}
                            data-max-size="2000"
                            style={{ display: 'none' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CropOriginalIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={classes.margin_}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Add Party
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

addParty.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
});
export const cleanUp_ = () => cleanUp();

export default withStyles(styles)(
    connect(mapStateToProps, { addParty, cleanUp_ })(Party)
);
