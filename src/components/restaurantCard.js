import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '230px',
        margin: '10px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const RestaurantCard = ({ restaurants }) => {
    const classes = useStyles();
    function loadRestaurants() {
        return restaurants.map((restaurant, index) => {
            return (
                <Card className={classes.root} key={index}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Brand Name: {restaurant.Brand}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {restaurant.Variety}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <b>{restaurant.Country}</b> Rating : {restaurant.Stars}
                        </Typography>
                    </CardContent>
                </Card>
            );
        })
    }
    return (
        <div style={{ display: 'flex', flexFlow: 'wrap' }}>
            {loadRestaurants()}
        </div>
    );
}

export default RestaurantCard;