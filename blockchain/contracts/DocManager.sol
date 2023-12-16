// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract DocManager {
    event UserCreated(
        address indexed userAddress,
        string username,
        bool isOrganization
    );
    event DocumentCreated(
        uint256 indexed docId,
        string title,
        address indexed issuer
    );
    event DocumentIssued(
        uint256 indexed docId,
        address indexed issuer,
        address indexed issuedTo
    );
    event DocumentAccessGranted(
        uint256 indexed docId,
        address indexed grantedAddress
    );
    event DocumentAccessRevoked(
        uint256 indexed docId,
        address indexed revokedAddress
    );

    struct Document {
        uint256 docId;
        string title;
        string cid;
        address issuer;
        address issuedTo;
        address[] access;
    }

    struct User {
        address userAddress;
        string username;
        bool isOrganization;
        uint256[] docs;
    }

    mapping(uint256 => Document) documents;
    mapping(address => User) users;

    modifier onlyIssuer(uint256 _docId) {
        require(
            documents[_docId].issuer == msg.sender,
            "Only the issuer can perform this action"
        );
        _;
    }

    modifier onlyOrganization() {
        require(
            users[msg.sender].isOrganization,
            "Only organizations can perform this action"
        );
        _;
    }

    modifier onlyUnIssued(uint256 _docId) {
        require(
            documents[_docId].issuedTo == address(0),
            "This document is already issued"
        );
        _;
    }

    modifier onlyIssuedTo(uint256 _docId) {
        require(
            documents[_docId].issuedTo == msg.sender,
            "Only the recipient can perform this action"
        );
        _;
    }

    modifier onlyDocumentAccess(uint256 _docId) {
        require(
            documents[_docId].issuer == msg.sender ||
                documents[_docId].issuedTo == msg.sender ||
                hasDocumentAccess(msg.sender, _docId),
            "You do not have access to this document"
        );
        _;
    }

    function getMyDetails() external  view returns (
        string memory name,
        bool isOrg
    ) {
        require(
            users[msg.sender].userAddress != address(0),
            "User not registered"
        );
        name = users[msg.sender].username;
        isOrg = users[msg.sender].isOrganization;
    }

    function createUser(string memory _username, bool _isOrganization)
        external
    {
        require(
            users[msg.sender].userAddress == address(0),
            "User already exists"
        );
        User storage newUser = users[msg.sender];
        newUser.userAddress = msg.sender;
        newUser.username = _username;
        newUser.isOrganization = _isOrganization;

        emit UserCreated(msg.sender, _username, _isOrganization);
    }

    function createDocument(string memory _title, string memory _contentId)
        external
    {
        require(
            users[msg.sender].isOrganization,
            "Only organizations can issue documents"
        );
        uint256 docId = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        Document storage newDocument = documents[docId];
        newDocument.docId = docId;
        newDocument.title = _title;
        newDocument.cid = _contentId;
        newDocument.issuer = msg.sender;
        users[msg.sender].docs.push(docId);

        emit DocumentCreated(docId, _title, msg.sender);
    }

    function issue(uint256 _docId, address _user)
        external
        onlyIssuer(_docId)
        onlyUnIssued(_docId)
    {
        users[_user].docs.push(_docId);
        documents[_docId].issuedTo = _user;

        emit DocumentIssued(_docId, msg.sender, _user);
    }

    function grantAccess(uint256 _docId, address _to)
        external
        onlyIssuedTo(_docId)
    {
        documents[_docId].access.push(_to);

        emit DocumentAccessGranted(_docId, _to);
    }

    function revokeAccess(uint256 _docId, address _from)
        external
        onlyIssuedTo(_docId)
    {
        for (uint256 i = 0; i < documents[_docId].access.length; i++) {
            if (documents[_docId].access[i] == _from) {
                documents[_docId].access[i] = documents[_docId].access[
                    documents[_docId].access.length - 1
                ];
                documents[_docId].access.pop();
                emit DocumentAccessRevoked(_docId, _from);
                break;
            }
        }
    }

    function getMyDocs() external view returns (uint256[] memory) {
        return users[msg.sender].docs;
    }

    function verify(string memory _cid, address _userid)
        external
        view
        returns (
            address issuedBy,
            address issuedTo,
            string memory title
        )
    {
        for (uint256 i = 0; i < users[_userid].docs.length; i++) {
            if (keccak256(bytes(documents[i].cid)) == keccak256(bytes(_cid))) {
                issuedBy = documents[i].issuer;
                issuedTo = documents[i].issuedTo;
                title = documents[i].title;
                break;
            }
        }
    }

    function getDocumentDetails(uint256 _docId)
        external
        view
        onlyDocumentAccess(_docId)
        returns (
            uint256 docId,
            string memory title,
            address issuer,
            address issuedTo
        )
    {
        Document storage doc = documents[_docId];
        docId = doc.docId;
        title = doc.title;
        issuer = doc.issuer;
        issuedTo = doc.issuedTo;
    }

    function hasDocumentAccess(address _user, uint256 _docId)
        internal
        view
        returns (bool)
    {
        for (uint256 i = 0; i < documents[_docId].access.length; i++) {
            if (documents[_docId].access[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function getDocumentAccessList(uint256 _docId)
        external
        view
        onlyIssuedTo(_docId)
        returns (address[] memory)
    {
        return documents[_docId].access;
    }
}

