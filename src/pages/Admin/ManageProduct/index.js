import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Modal from './../../../components/Modal';
import FormInput from './../../../components/forms/FormInput';
import FormSelect from './../../../components/forms/FormSelect';
import FormUpload from './../../../components/forms/FormUpload';
import Button from './../../../components/forms/Button';
import { addProductStart, fetchProductsStart, deleteProductStart, editProductStart } from './../../../redux/Products/products.actions';
import { storage } from './../../../firebase/utils';

import './styles.scss';

// Material Ui
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItems from './../UI/listItems';
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
    width: '100vh',
    height: '100vh',
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
  const [hideModal, setHideModal] = useState(true);
  const [image, setImage] = useState(null);
  const [productCategory, setProductCategory] = useState('to-go');
  const [productName, setProductName] = useState('');
  const [productStock, setProductStock] = useState(0);
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

  const [open, setOpen] = useState(true);
  const [popup, setPopup] = useState(false);
  const [editor, setEditor] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    setProductStock(0);
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
        productPrice,
        productStock
      })
    );
    resetForm();
  };

  const handleEditSubmit = e => {
	  e.preventDefault();
	  dispatch(
		editProductStart({
		  productCategory,
		  productName,
		  productThumbnailUrl,
		  productPrice,
		  productStock
		})
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
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Admin Portal
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems /></List>
        <Divider />
      </Drawer>
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
            <FormInput
              required
              label="Stock"
              type="number"
              min="0"
              max="10000"
              step="1"
              value={productStock}
              handleChange={e => setProductStock(e.target.value)}
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
	  <div className="currentProductsTable">
    <TableContainer component={'div'}>
        <Table stickyHeader={true} size={'small'}>
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
                  Stock
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
                      productStock,
					  documentID
                    } = product
                    return (
                      <TableRow key={index}>
						  <TableCell align="center">
							  <img className="previewImg" src={productThumbnailUrl} />
						  </TableCell>
						  <TableCell align="center">
							  私は <Box component="span" >{productName}</Box> です。
						  </TableCell>
						  <TableCell align="center">
							  ฿{productPrice}
						  </TableCell>
						  <TableCell align="center">
							  {productStock}
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
		</div>
      </Grid>
      </Grid>
      </Paper>
    </Container>
    </main>
    </div>
  );
}
export default ManageProduct;