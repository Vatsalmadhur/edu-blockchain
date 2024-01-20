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
import { issueDoc } from "../../ContractMethods";
import { InputModal } from "./inputmodel";

export const IssueModal = ({ isOpen, onClose, docId }) => {
    const [userId, setUserid] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const handleSubmit = async () => {
      setLoading(true);
      const { status, error } = await issueDoc(docId, userId);
      if (!!status) {
        toast({
          title: "Document Issued",
          status: "success",
        });
        onClose();
      } else {
        toast({
          title: error,
          status: "error",
        });
      }
      setLoading(false);
    };
    return (
      <InputModal isOpen={isOpen || loading} onClose={onClose}>
        <Input
          name="issueTo"
          placeholder="Issue to"
          onChange={(e) => setUserid(() => e.target.value)}
        />
        <Input name="docId" placeholder="Doc Id" value={docId} readOnly />
        <Button onClick={handleSubmit}>Issue</Button>
      </InputModal>
    );
  };