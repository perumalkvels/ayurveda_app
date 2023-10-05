import * as React from 'react';
import { useNavigate,} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function ProductPage(){

    const navigate = useNavigate();
    const productList = useSelector(state => state.productData.productList);
  
    return (
      <React.Fragment>
          <Grid container spacing={4} sx={{m:'auto'}}>
            {productList && productList?.map((item) => (
              <Grid item key={item.name} >
                <Card
                  sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={item.image_url}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography>
                    {item.desc}
                    </Typography>
                    <Typography sx={{mt:3}}>
                    {item.price ?`Price with Incredients - ${item.price} Rs` : 
                              'No Incredients are added Currently'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                        >
                          <Button variant="contained">View</Button>
                          <Button variant="contained" 
                            onClick={() => navigate(`/products/editproduct/${item.p_id}`)}>
                            Edit Product
                          </Button>
                     </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </React.Fragment>
    );
}


{/* <div className='d-flex space-between justify-content-center'>
{productList && productList?.map(item =>{
   return(<>
     <div className="card m-3" style={{width: '18rem'}}>
      <img src={item.image_url} className="card-img-top" alt="..." />
        <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.desc}</p>

              <p className="card-text text-danger py-1">
                {item.price ?`Price with Incredients - ${item.price}` : 
                              'No Incredients are added Currently'}
              </p>
              <div className = 'd-flex p-0'>
                <button className="btn btn-primary" >Purchase</button>
                <button className="btn btn-primary ml-3" 
                  onClick={() => navigate(`/products/editproduct/${item.p_id}`)
                    // navigate(`/products/${item.p_id}`,{replace: true})
                }>
               Edit Product
                </button>
              </div>
        </div>
     </div>
   </>)
  })
}
</div> */}