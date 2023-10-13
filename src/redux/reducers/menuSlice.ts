import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from "../baseUrl"
import axios from "axios";
import toast from 'react-hot-toast';


export const getmenu = createAsyncThunk(
    "get/menu",
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(`${baseUrl}/menu`)
            return res?.data
        } catch (error) {
            toast.error("Could not connect to server!")
            return rejectWithValue(error)
        }
    }
)

type id={
    id:string 
}
export const getsingleMenu = createAsyncThunk(
    "get/menu",
    async(id:id,{rejectWithValue})=>{
        try {
            let res = await axios.get(`${baseUrl}/menu/single/${id}`)
            return res?.data
        } catch (error) {
            toast.error("Could not connect to server!")
            return rejectWithValue(error)
        }
    }
)

export const DeleteSingleMenu = createAsyncThunk(
    "get/menu",
    async(id:id,{rejectWithValue})=>{
        try {
            let res = await axios.delete(`${baseUrl}/menu/${id?.id}`)
            toast.success("Successfully Deleted")
            return res?.data
        } catch (error) {
            toast.error("Could not connect to server!")
            return rejectWithValue(error)
        }
    }
)

interface datatype{
    title:string;
    description:string;
    price: number;
    image?: string;
    

}
interface updatedatatype{
    title:string;
    description:string;
    price: number;
    image?: string;
   id: string;

}

export const createMenu = createAsyncThunk(
    "post/menu",
    async(data:datatype,{rejectWithValue})=>{
        try {
            let res = await axios.post(`${baseUrl}/menu`,{
                title: data.title,
                description: data.description,
                image: data.image,
               price: data.price
            })
            // console.log(res?.data);
            
            return res?.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateMenu = createAsyncThunk(
    "post/menu",
    async(data:updatedatatype,{rejectWithValue})=>{
        try {
            let res = await axios.put(`${baseUrl}/menu/${data.id}`,{
                title: data.title,
                description: data.description,
                image: data.image,
               price: data.price
            })
            // console.log(res?.data);
            toast.success("Successfully Updated")
            return res?.data
        } catch (error) {
            
            
            toast.error("Something went wrong!")
            return rejectWithValue(error)
        }
    }
)

interface menutype{
    title: string;
    description: string;
    price: Number;
    image: string;
    _id:string
}

interface menustate{
    count: number;
    menu: Array<menutype>
}

interface userState {
    loading: boolean;
    error: string | null;
    menu: menustate | null;
    
  }

const initialState = {
    loading:false, error:null,
    menu: null } as userState

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=> {
        builder.addCase(getmenu.pending,(state)=>{
            state.loading = true
        })
        .addCase(getmenu.fulfilled,(state,action:PayloadAction<any>)=>{
            state.loading = false;
            state.menu = action.payload
        })
        .addCase(getmenu.rejected,(state,action:PayloadAction<any>)=>{
            state.loading = false;
           state.error = action.payload;
        })
    },
})

export default menuSlice.reducer