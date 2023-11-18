import { useState, useEffect } from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { getMyDocs, uploadDoc } from "../../ContractMethods";
import axios from "axios";

const API_KEY = "4e73af18d3434f688b8f";
const API_SECRET =
    "62659081106ac972560067216ffb6ecbdc8959f9028a1c10a4cc6dcdca4ae189";

const Dash = () => {
    const [myDocs, setMyDocs] = useState([]);

    const [uploadStatus, setUploadStatus] = useState("Confirm");
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        setUploadStatus("uploading...");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        pinata_api_key: API_KEY,
                        pinata_secret_api_key: API_SECRET,
                    },
                }
            );
            setUploadStatus("updating...");
            await uploadDoc("title", response.data.IpfsHash);
        } catch (error) {
            console.error(error);
        }
        setUploadStatus("Confirm");
    };

    useEffect(() => {
        const getDocs = async () => {
            try {
                const data = await getMyDocs();
                setMyDocs(data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        getDocs();
    }, []);
    return (
        <Box mt={16}>
            <input
                type="file"
                name="file"
                id="amount"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>{uploadStatus}</button>

            <Heading mb={4}>My Documents</Heading>
            {myDocs.length === 0 ? (
                <p>No documents found.</p>
            ) : (
                <List>
                    {myDocs.map((doc, index) => (
                        <ListItem key={index}>{doc.name}</ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Dash;
