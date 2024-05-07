import { useParams } from "react-router-dom";

const ViewItemPage = () => {
    const params = useParams()
    console.log(params);
    
    return <div>
        category:`{params.category}`
        id:`{params.id}`
    </div>;
  };
  
  export default ViewItemPage;