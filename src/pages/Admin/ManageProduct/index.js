import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FormInput from './../../../components/forms/FormInput';
import FormSelect from './../../../components/forms/FormSelect';
import Button from './../../../components/forms/Button';
import { addProductStart, fetchProductsStart, deleteProductStart, editProductStart } from './../../../redux/Products/products.actions';
import { storage } from './../../../firebase/utils';

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
import Title from './../UI/Title';
import DeleteIcon from '@material-ui/icons/Delete';
import { handleFetchProducts } from '../../../redux/Products/products.helpers';

const drawerWidth = 240;

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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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

const mapState = ({ productsData }) => ({
  products: productsData.products
})

const ManageProduct = props => {
  const { products } = useSelector(mapState);
  const [image, setImage] = useState(null);
  const [productCategory, setProductCategory] = useState('to-go');
  const [productName, setProductName] = useState('');
  const [productThumbnailUrl, setProductThumbnailUrl] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
  useEffect(() => {
    dispatch(
      fetchProductsStart()
    )
  }, []);


  const [popup, setPopup] = useState(false);
  const [editor, setEditor] = useState(false);



  const handleDialogOpen = () => {
    setPopup(true);
  };

  const handleCloseDialog = () => {
    resetForm();
  };
  

  const resetForm = () => {
    setProductCategory('to-go');
    setProductName('');
    setProductThumbnailUrl('');
    setProductPrice(0);
    setPopup(false);
    setProgress('');
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnailUrl,
        productPrice
      })
    );
    resetForm();
  };


  const handleEditSubmit = e => {
	  e.preventDefault();
	  dispatch(
		editProductStart()
	  );
  }

  const handleImgChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then( productThumbnailUrl => {
          setProductThumbnailUrl(productThumbnailUrl);
        })
      const productThumbnailUrl = () => {
        if (!productThumbnailUrl){
          return null;
        }
        else {
          return;
        }
      }
      }
    )
  };

  console.log("image: ", image);

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="false" className={classes.container}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="callToActions">
                <ul>
                  <li>
                    <Button onClick={handleDialogOpen}>
                      Add new product
                    </Button>
                  </li>
                </ul>
      </div>
            </Grid>
      <Grid item xs={12} md={8} lg={9}>
      <Dialog className={classes.dialog} open={popup} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" Fade fullScreen={fullScreen}> 
        <DialogContent>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            
            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "to-go",
                name: "To Go"
              }, {
                value: "fresh-brew",
                name: "Fresh Brew"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              required
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

          <div className="imgUploader">
            <FormInput
              label="Product Image"
              accept="image/*"
              type="file"
              onChange={handleImgChange}
              class="custom"
              />
            <Button disabled={!image} type="button" name="imgUpload" onClick={handleUpload}>Upload</Button>
            <progress className="progressBar" value={progress} max="100" />
            <div className="imgPreview">
            <img src={productThumbnailUrl} />
            </div>
          </div>
              
         

            <FormInput
              required
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="1"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />
  
            <DialogActions className="modalButton">
              <Button type="reset" onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button name="formSubmit" type="submit">
                Add new product
              </Button>
            </DialogActions>
          </form>
        </div>
        </DialogContent>
      </Dialog>
      </Grid>
      <Grid item xs={12}>
      <Title>Product Management</Title>
    <TableContainer component={'div'}>
        <Table stickyHeader={true} size={'medium'}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Preview
                </TableCell>
                <TableCell align="center">
                  Product
                </TableCell>  
                <TableCell align="center">
                  Sell Price
                </TableCell> 
				        <TableCell align="center">
                  Remove
                </TableCell>     
              </TableRow>  
            </TableHead>   
            <TableBody>
            {products.map((product, index) => {
                    const {
                      productName,
                      productThumbnailUrl,
                      productPrice,
					            documentID
                    } = product
                    return (
              <TableRow key={index} hover>
						  <TableCell align="center" className="currentImg" >
							  <img className="previewImg" src={productThumbnailUrl} />
						  </TableCell>
						  <TableCell align="center">
							  私は <Box component="span" >{productName}</Box> です。
						  </TableCell>
						  <TableCell align="center">
							  ฿{productPrice}
						  </TableCell>
						  <TableCell align="center">
							  <Button onClick={() => dispatch(deleteProductStart(documentID)) }>
							  <DeleteIcon />
							  </Button>
						  </TableCell>
            </TableRow>
                    )
                  })}
            </TableBody>         
        </Table>
        </TableContainer>
      </Grid>
      </Grid>
      </Paper>
    </Container>
    </main>
    </div>
  );
}
export default ManageProduct;