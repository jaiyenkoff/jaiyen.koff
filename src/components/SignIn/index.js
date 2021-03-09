import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart, facebookSignInStart} from "./../../redux/User/user.actions";
import { Link,useHistory } from 'react-router-dom';
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    height: '100%',
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

const SignIn = props =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userError } = useSelector(mapState)
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }
  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
        setErrors(userError);
    }
}, [userError])

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors([]);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(emailSignInStart({email, password}));
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const handleFacebookSignIn = () => {
    dispatch(facebookSignInStart());
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
            Log in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextFieldWrapper
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />
            <TextFieldWrapper
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" className="signInButton">
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/jointheparty">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/jointheparty">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Grid container>
                <div className="socialSignin">
                <Grid item>
                    <div className="row">
                                    <Button onClick={handleGoogleSignIn}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'google']} size="m" /> Log In With Google 
                                    </Button>
                    </div>
                </Grid>
                <Grid item>
                    <div className="row">
                                    <Button onClick={handleFacebookSignIn}>
                                    <FontAwesomeIcon className="icon" icon={['fab' , 'facebook']} size="m" /> Log In With Facebook 
                                    </Button>
                    </div>
                </Grid>
                </div>
            </Grid>
            <Box>
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

export default SignIn