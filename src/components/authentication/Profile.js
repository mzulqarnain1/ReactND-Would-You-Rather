
import React from "react";
import {connect} from "react-redux";

function Profile(props){

    function onSelect(e){
        const {id, onSelect} = props
        onSelect(id)
    }

    const {user, selected} = props
    const {id, avatarURL, name} = user
    return(
        <div className='profile' style={selected ? {backgroundColor: 'lightblue'} : {}} key={id} onClick={onSelect}>
            <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className='avatar'
            />
            <span className='profile-info'>{name}</span>
        </div>
    )
}

function mapStateToProps({users}, {id, selected, onSelect}){
    return{
        user: users[id],
        id,
        selected,
        onSelect
    }
}

export default connect(mapStateToProps)(Profile)