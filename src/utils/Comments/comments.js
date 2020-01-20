import axios from '../../axios-orders';

const fixResponse = (comments)=>{
    
}

async function get(id, isReplay){
    const url = isReplay ?
        'comments/'+id :
        'commentResponse/'+id;
    const comments = await axios.get(url);

    return comments;
}

async function post(comment, isReplay){
    const url = isReplay ?
        'comments' :
        'commentResponse';
    const postedComment = await axios.post(url, comment);

    return get(postedComment.id, isReplay)
}

export default { get, post };