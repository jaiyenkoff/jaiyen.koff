import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        display: 'inline-block'
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
})
)

const Product = ({
    productThumbnailUrl,
    productName, 
    productPrice
}) => {

    const classes = useStyles();
    const theme = useTheme();

    if (!productThumbnailUrl || !productName || 
        typeof productPrice === 'undefined') return null;

    return (
        <div>
            <Container maxWidth="md" className={classes.cardGrid}>
                <Grid container 
                    spacing={4}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={productThumbnailUrl}
                            title={productName}
                        />
                         <CardContent className={classes.cardContent}>
                            <Typography>
                                {productName}
                            </Typography>
                            <Typography>
                                {productPrice}
                            </Typography>
                         </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Product