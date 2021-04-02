import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/Products/products.actions';
import Product from './Product';
import './styles.scss';

// Material Ui
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Title from './../../pages/Admin/UI/Title';
import DeleteIcon from '@material-ui/icons/Delete';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      width: '1',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      margin: '0 auto',
    },
    dialog: {
      height: '100vh',
      width: '1000',
    },
  }));

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        )
    }, [])

    if (!Array.isArray(products)) return null;
    if (products.length < 1) {
        return (
            <div className="products">
                <p>No results.</p>
            </div>
        );
        }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
        <div className="productResults">
        <Container maxWidth="false" className={classes.container}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Title>Our Products</Title>
            {products.map((product, pos) => {
                const { productThumbnailUrl, productName, productPrice } = product;
                if (!productThumbnailUrl || !productName || 
                    typeof productPrice === 'undefined') return null;
                    
                  const configProduct = {
                    productThumbnailUrl,
                    productName, 
                    productPrice
                  }

                return (
                    <div key={pos}>
                      <Product {...configProduct}/>
                    </div>
                )
            })}
            </Grid>
            </Grid>
        </Container>
        </div>
        </main>
        </div>
    )
}

export default ProductResults;