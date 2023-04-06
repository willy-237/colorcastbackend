import React, { useEffect, useState } from "react";
import 'primeflex/primeflex.css';
import { DataView } from 'primereact/dataview/dataview.esm.js';
import IconButton from '@mui/material/IconButton/IconButton.js';
import DeleteIcon from "@mui/icons-material/esm/Delete.js"
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge/Badge.js"
import  styled  from '@mui/material/styles/styled.js'
import { listUsers } from "../../Api/Users/api-users.js";
import auth from "../../Api/Auth/auth-helper.js";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


function Profile(){
    const [users, setUsers] = useState([]);
    const jwt = auth.isAuthenticated();

    useEffect(()=>{
        listUsers({t: jwt.token}).then((data) =>{
            if(data && data.error){

            }else{
                setUsers(data)
            }
        })
    }, [])

    const itemTemplate = (user) => {
        return (
            <div>
                    <div>
                        <div>
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                <Avatar sx={{ width: 100, height: 100 }}/>
                            </StyledBadge>
                        </div>
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div>
                            <IconButton></IconButton>
                            <IconButton></IconButton>
                    </div>
            </div>
        );
    };

    return(
        <div>
            <DataView value={users} itemTemplate={itemTemplate} />
        </div>
    )
}

export default Profile