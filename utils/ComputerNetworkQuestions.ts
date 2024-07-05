import moment from "moment";
import { db } from "./db";
import { DefaultTable } from "./schema";
import { v4 as uuidv4 } from "uuid";

export const ComputerNetworkQuestions = {
  questions:[
    {
      question:
        "What is an IPv4 address? What are the different classes of IPv4?",
      answer:
        "An IPv4 address is a 32-bit address used to identify devices on a network. It is divided into classes:\nClass A: 1.0.0.1 to 126.255.255.254 for large networks.\nClass B: 128.1.0.1 to 191.255.255.254 for medium-sized networks.\nClass C: 192.0.1.1 to 223.255.255.254 for small networks.\nClass D: 224.0.0.0 to 239.255.255.255 reserved for multicast groups.\nClass E: 240.0.0.0 to 255.255.255.254 reserved for future use.",
    },
    {
      question: "Explain different types of networks.",
      answer:
        "There are several types of networks:\nPAN: Personal Area Network, LAN: Local Area Network, MAN: Metropolitan Area Network, WAN: Wide Area Network, GAN: Global Area Network.",
    },
    {
      question: "Explain LAN (Local Area Network).",
      answer:
        "LAN is a network that connects computers within a limited area such as a residence, school, or office building.",
    },
    {
      question: "Tell me something about VPN (Virtual Private Network).",
      answer:
        "VPN allows secure connections between private networks over a public network such as the Internet.",
    },
    {
      question: "What are the advantages of using a VPN?",
      answer:
        "Advantages include enhanced security, remote access, bypassing geographic restrictions, and cost savings for connecting remote users.",
    },
    {
      question: "What are the different types of VPN?",
      answer:
        "Types include remote access VPN, site-to-site VPN, and extranet VPN, each serving different connectivity needs.",
    },
    {
      question: "What are nodes and links?",
      answer:
        "Nodes are devices like computers or printers in a network, while links are the connections between them, which can be wired or wireless.",
    },
    {
      question: "What is network topology?",
      answer:
        "Network topology refers to the arrangement of nodes and links in a network, such as bus, star, ring, mesh, and hybrid topologies.",
    },
    {
      question: "Define different types of network topology.",
      answer:
        "Types include bus, star, ring, mesh, tree, and hybrid topologies, each with unique advantages and disadvantages.",
    },
    {
      question: "How are Network types classified?",
      answer:
        "Networks are classified based on their geographic scope, including PAN, LAN, MAN, WAN, and GAN.",
    },
    {
      question: "What are Private and Special IP addresses?",
      answer:
        "Private IP addresses (e.g., 10.x.x.x, 172.16.x.x - 172.31.x.x, 192.168.x.x) are reserved for private networks and are not routable on the Internet. Special IP addresses (e.g., 127.x.x.x) are reserved for loopback testing.",
    },
    {
      question: "What is the DNS?",
      answer:
        "DNS, or Domain Name System, translates domain names like 'example.com' into IP addresses that computers use to communicate on a network.",
    },
    {
      question:
        "What is the use of a router and how is it different from a gateway?",
      answer:
        "A router directs traffic between different networks, while a gateway connects networks using different protocols.",
    },
    {
      question: "What is the SMTP protocol?",
      answer:
        "SMTP is used to transmit emails across the Internet, providing a set of rules for sending and receiving email messages.",
    },
    {
      question: "Describe the OSI Reference Model.",
      answer:
        "The OSI model defines a networking framework of 7 layers, from physical transmission to application services, enabling interoperability between diverse systems.",
    },
    {
      question: "Define the 7 different layers of the OSI Reference Model.",
      answer:
        "Layers include Physical, Data Link, Network, Transport, Session, Presentation, and Application, each serving specific functions in data communication.",
    },
    {
      question: "Describe the TCP/IP Reference Model.",
      answer:
        "The TCP/IP model simplifies networking into 4 layers: Link, Internet, Transport, and Application, used widely for Internet communications.",
    },
    {
      question: "Define the 4 different layers of the TCP/IP Reference Model.",
      answer:
        "Layers include Link, Internet, Transport, and Application, providing a framework for communication across interconnected networks.",
    },
    {
      question:
        "Differentiate OSI Reference Model with TCP/IP Reference Model.",
      answer:
        "OSI has 7 layers with fixed boundaries; TCP/IP has 4 layers with flexible boundaries, adapted for the Internet's robustness.",
    },
    {
      question: "What are the HTTP and HTTPS protocols?",
      answer:
        "HTTP transfers data over the web, while HTTPS adds a layer of security using SSL/TLS encryption to protect data in transit.",
    },
    {
      question: "What is the FTP protocol?",
      answer:
        "FTP enables file transfer between systems on a network, providing reliable and efficient data exchange.",
    },
    {
      question: "What is the TCP protocol?",
      answer:
        "TCP ensures reliable data delivery over IP networks, using a connection-oriented approach with error-checking and retransmission mechanisms.",
    },
    {
      question: "What is the UDP protocol?",
      answer:
        "UDP provides a connectionless, lightweight data transmission method, suitable for real-time applications where speed is prioritized over reliability.",
    },
    {
      question: "Compare TCP and UDP.",
      answer:
        "TCP is reliable, connection-oriented, and slower, while UDP is fast, connectionless, and less reliable, suitable for time-sensitive applications.",
    },
    {
      question: "What is the ICMP protocol?",
      answer:
        "ICMP is used for network troubleshooting and error messaging, providing feedback on network status and connectivity issues.",
    },
    {
      question: "What is the DHCP protocol?",
      answer:
        "DHCP automates IP configuration for devices on a network, assigning IP addresses dynamically to enable seamless connectivity.",
    },
    {
      question: "What is the ARP protocol?",
      answer:
        "ARP maps IP addresses to MAC addresses on a local network, facilitating communication between devices.",
    },
    {
      question: "What is the MAC address and how is it related to NIC?",
      answer:
        "A MAC address uniquely identifies network devices at the data link layer and is embedded in the NIC hardware.",
    },
    {
      question: "Differentiate the MAC address with the IP address.",
      answer:
        "A MAC address is a hardware identifier for devices, while an IP address is a logical identifier for networked devices.",
    },
    {
      question: "What is a subnet?",
      answer:
        "A subnet is a logical subdivision of an IP network, allowing efficient management and routing of network traffic.",
    },
    {
      question: "Compare hub vs switch.",
      answer:
        "A hub operates at the physical layer, while a switch operates at the data link layer, providing smarter, more efficient traffic handling.",
    },
    {
      question: "What is the difference between ipconfig and ifconfig?",
      answer:
        "ipconfig is used in Windows to manage network interfaces, while ifconfig is used in Unix-like systems for the same purpose.",
    },
    {
      question: "What is a firewall?",
      answer:
        "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
    },
    {
      question:
        "What are Unicasting, Anycasting, Multicasting, and Broadcasting?",
      answer:
        "Unicasting sends data to a single recipient, anycasting sends data to any of a group of recipients, multicasting sends data to a group of recipients, and broadcasting sends data to all recipients on a network.",
    },
    {
      question: "What happens when you enter google.com in the web browser?",
      answer:
        "The browser checks its cache for the website, performs a DNS lookup to find the server's IP address, establishes a TCP connection, sends an HTTP request to the server, receives and processes the server's response, and displays the web page.",
    },
  ]
};

async function putComputerNetworkQuestions() {
  const response = await db.insert(DefaultTable).values({
    questionAnswer: JSON.stringify(ComputerNetworkQuestions),
    topicName: "ComputerNetwork",
    createdAt: moment().format("DD-MM-yyyy"),
    mockId: uuidv4(),
  });
  console.log(response);
}

export default putComputerNetworkQuestions;
