import React from 'react';
import { useParams } from 'react-router';

const RoleMembers =() => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            we are in {id}!!! 
        </div>
    )
}

export default RoleMembers;
