import { unixfs } from "@helia/unixfs";
import { BlackHoleBlockstore } from "blockstore-core/black-hole";
import { fixedSize } from "ipfs-unixfs-importer/chunker";
import { balanced } from "ipfs-unixfs-importer/layout";
import axios from "axios";

export const calculateCid = async (bytes) => {
  const unixFs = unixfs({
    blockstore: new BlackHoleBlockstore(),
  });

  const cid = await unixFs.addBytes(bytes, {
    cidVersion: 0,
    rawLeaves: false,
    leafType: "file",
    layout: balanced({
      maxChildrenPerNode: 174,
    }),
    chunker: fixedSize({
      chunkSize: 262144,
    }),
  });
  const cidv1 = cid.toV1().toString();
  return cidv1;
};

export const pineFileToIpfs = async ({ file, title = "temp" }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", title);
    const { status: code, data } = await axios.post(
      "http://localhost:5000/getIpfsHash",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (code === 200) {
      return data;
    } else {
      return { status: false, msg: "Error in uploading file" };
    }
  } catch (e) {
    return { status: false, msg: e.message };
  }
};
