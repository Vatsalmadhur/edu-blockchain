import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { issueDoc } from "../../ContractMethods";
import { InputModal } from "./inputmodel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const IssueModal = ({ isOpen, onClose, docId }) => {
  const darkBtn = useColorModeValue("cyan.500", "cyan.500");

  const [userId, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const load = toast.loading("Working")
    setLoading(true);
    const { status, error } = await issueDoc(docId, userId);
    if (!!status) {
      toast.update(load, { render: "Document Issued", type: "success", isLoading: false, autoClose:5000});
      onClose();
    } else if(error) {
      toast.update(load, { render: "Error Occured", type: "error", isLoading: false,autoClose:5000});
    }
    setLoading(false);
  };

  return (
    <InputModal isOpen={isOpen || loading} onClose={onClose}>
      <Input
        name="issueTo"
        placeholder="Issue to (0x.....)"
        onChange={(e) => setUserid(() => e.target.value)}
        marginY={5}
      />
      {/* <Input name="docId" placeholder="Doc Id" value={docId} readOnly /> */}
      <Button onClick={handleSubmit} marginY={2} border="2px solid" borderColor={darkBtn}>Issue</Button>
    </InputModal>
  );
};