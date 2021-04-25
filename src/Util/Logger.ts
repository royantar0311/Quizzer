const log = (data: any) => {
    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
        console.log(data);
    }
};
export default log;