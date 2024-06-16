import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../firebase'
import axios from 'axios'

const CreatePost = () => {
  const [title, settitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState(undefined)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [error, setError] = useState('')
  const [imgPerc, setImgPerc] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"]

  const uploadFile = (file) => {
    const storage = getStorage(app);
    console.log("ab");
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setThumbnailUrl(downloadURL);
        });
      }
    );
  };

  const createPost = async (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnailUrl)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 201) {
        return navigate('/')
      }
      setThumbnailUrl('');
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  useEffect(() => {
    thumbnail && uploadFile(thumbnail);
  }, [thumbnail]);


  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Create Post</h2>
        {error && <p className='form_error-message'>{error}</p>}
      </div>
      <form className='form create-post_form' onSubmit={createPost}>
        <input type='text' placeholder='Title' value={title} onChange={e => settitle(e.target.value)} autoFocus />
        <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
          {
            POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
          }
        </select>
        <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
        {imgPerc > 0 ? ("uploading " + imgPerc + " %") : <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png , jpg,jpeg' />}
        {!thumbnailUrl && <button type="submit" className="btn btn-primary" disabled={true}>Create</button>}
        {thumbnailUrl && <button type="submit" className="btn btn-secondary ">
          Create
        </button>}
      </form>
    </section>
  )
}

export default CreatePost
