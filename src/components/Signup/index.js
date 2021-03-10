import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserStart } from './../../redux/User/user.actions'
import './styles.scss';

// Components
import TextFieldWrapper from './../FormUI/TextFieldWrapper';
import Button from './../forms/Button';

// Material Ui
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LocalCafeOutlinedIcon from '@material-ui/icons/LocalCafeOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://jaiyen-koff.web.app/">
        JAIYEN KOFFEE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userError: user.userError
  });
  

const SignUp = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userError } = useSelector(mapState);
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        if (currentUser) {
            reset();
            history.push('/');
        }
    }, [currentUser])

    useEffect(() => {
        if (Array.isArray(userError) && userError.length > 0) {
            setErrors(userError);
        }
    }, [userError])


    const reset = () => {
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors([]);
    }

      const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,  
            confirmPassword
        }));
    
      }
  

        const configAuthWrapper = {
          headline: 'Sign Up'
        }

        return (
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar} >
                  <LocalCafeOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Join The Party
                </Typography>
                <form className={classes.form} onSubmit={handleFormSubmit}>
                  <TextFieldWrapper
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeHolder="User Name"
                    handleChange={e => setDisplayName(e.target.value)}
                  />
                  <TextFieldWrapper
                    type="email"
                    name="email"
                    value={email}
                    placeHolder="Email"
                    handleChange={e => setEmail(e.target.value)}
                  />
                  <TextFieldWrapper
                    type="password"
                    name="password"
                    value={password}
                    placeHolder="Password"
                    handleChange={e => setPassword(e.target.value)}
                  />
                  <TextFieldWrapper
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeHolder="Confirm Password"
                    handleChange={e => setConfirmPassword(e.target.value)}
                  />
                  <Button type="submit" className="signUpButton">
                    Join The Party
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/login">
                        Already have an account? Log In
                      </Link>
                    </Grid>
                  </Grid>
                  <Box>
                  <div className="formFooter">
                        <h4>Wola! {displayName}</h4>
                        <p>Welcome to the party! :)</p>
                    <div className="errors">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}> 
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    </div>
                </div>
                  </Box>
                  <Box mt={2}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        );
      }

export default SignUp;