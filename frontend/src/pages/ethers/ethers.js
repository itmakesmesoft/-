const { create } = require("domain");
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");
// const { TOKENContract, TOKEN_CA } = require("./SmartContract.js");

const PRIVATE_NODE = "http://127.0.0.1:8545"; // 나중에 환경변수 처리 및 주소 변경

const provider = new ethers.providers.JsonRpcProvider();

// 코인베이스 주소 가져오기
// 0번째 account
const getAdminAddress = async () => {
    const signer = await provider.getSigner(); // index가 제공되지 않으면 0번째 account 반환
    const coinbase = await signer.getAddress();
    //   console.log("관리자 지갑 : " + coinbase);
    return coinbase;
};

// 회원가입 - 지갑 만들기
const createAccount = async () => {
    const password = "123456"; // 지갑 임시 패스워드 -> 나중에는 회원가입할 때 받은 비밀번호면 좋겠음

    console.log(password);
    const coinbase = await getAdminAddress();
    const signer = ethers.Wallet.createRandom(); // 새 지갑 생성
    const keystore = await signer.encrypt(password); // 해당 지갑의 키스토어 파일 ~ 확장자 : json

    // 키스토어 파일을 ./public/keystores에 저장
    const dir = path.join('./', '..', '..', '..', 'public', 'keystores');

    if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    }

    const filename ="UTC" + new Date(Date.now()).toISOString().replace(/:/g, '-') + '-' + signer.address + ".json";
    const filepath = path.join(dir, filename);    
    
    fs.writeFileSync(filepath, keystore);
    console.log(filepath);
    //   console.log("signer address : " + signer.address);

    const wallet = signer.connect(provider);

    //   const total_bal = await TOKENContract.balanceOf(coinbase);
    //   const bal = await TOKENContract.balanceOf(wallet.address);

    //   console.log("송금 전!!! \n코인 베이스 잔액 : " + total_bal);
    //   console.log("새 지갑 잔액 : " + bal);

    // 코인베이스 -> 새 지갑 기본 잔액 전송
    const Eth = ethers.utils.parseEther("10");

    await TOKENContract.connect(provider.getSigner()).transfer(wallet.address, Eth);
    const tx = {
        from: coinbase,
        to: wallet.address,
        value: Eth,
    };
    await provider.getSigner().sendTransaction(tx);

    //   const total_bal2 = await TOKENContract.balanceOf(coinbase);
    //   const bal2 = await TOKENContract.balanceOf(wallet.address);

    //   console.log("송금 후!!! \n코인 베이스 잔액 : " + total_bal2);
    //   console.log("새 지갑 잔액 : " + bal2);

    // 지갑 생성 트랜잭션 남기기
    const signed = {
        to: coinbase,
        from: wallet.address,
        value: ethers.utils.parseEther("0.01"),
    };

    const transaction = await wallet.sendTransaction(signed);

    console.log("새 지갑 생성 완료");

    // 지갑주소(wallet.address), 키스토어 파일 경로(filepath) 반환해야 함 
    return wallet.address;
};

createAccount();

// 기부하기 - 내역 트랜잭션 남기기
const donate = async () => {
    /*
     * transaction 작성
     * function addDonationHistory(string memory nickname, uint256 projectId, string memory subject, uint generation, string memory date, uint256 amount)
     * 1. singer = 사용자 지갑
     * 2. 트랜잭션 만들기(사용자 -> 관리자)
     * 3. 프라이빗 키 구해서 서명
     * 4. 트랜잭션 보내기
     * 6. 트랜잭션 결과 반환 -> DB에 저장
     */
};

const TOKEN_ABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [],
        name: "INITIAL_SUPPLY",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const TOKEN_CA = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // localhost
// const TOKEN_CA = "0x4f223861e0f5139099bC18CacCbBc0019F487E0a"; // sepolia
const TOKENContract = new ethers.Contract(TOKEN_CA, TOKEN_ABI, provider.getSigner());

const DONATION_ABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "nickname",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "subject",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "generation",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "date",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "addDonationHistory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "donationHistories",
        outputs: [
            {
                internalType: "string",
                name: "nickname",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "subject",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "generation",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "date",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "page",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "pageSize",
                type: "uint256",
            },
        ],
        name: "getDonationHistories",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "nickname",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "projectId",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "subject",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "generation",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "date",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                internalType: "struct Donation.DonationHistory[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getDonationHistoriesLength",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "getDonationHistory",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "nickname",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "projectId",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "subject",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "generation",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "date",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                internalType: "struct Donation.DonationHistory",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const DONATION_CA = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // localhost
const DONATIONContract = new ethers.Contract(DONATION_CA, DONATION_ABI, provider.getSigner());

export default createAccount;
