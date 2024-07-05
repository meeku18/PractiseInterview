import moment from "moment";
import { db } from "./db";
import { DefaultTable } from "./schema";
import { v4 as uuidv4 } from "uuid";

export const OperatingSystemQuestions = {
  questions: [
    {
      question: "What are different types of Kernel?",
      answer:
        "There are basically five types of Kernels:\n\n1. Monolithic Kernel\n2. MicroKernel\n3. Hybrid Kernel\n4. Nano Kernel\n5. Exo Kernel",
    },
    {
      question: "What do you mean by Semaphore in OS? Why is it used?",
      answer:
        "Semaphore is a synchronization mechanism used to control access to shared resources in multi-threaded or multi-process systems. It maintains a count of available resources and provides two atomic operations: wait() and signal().\n\nTypes of Semaphores:\n\n1. Binary semaphore: Can only have two values: 0 and 1. It is used to signal the availability of a single resource.\n2. Counting semaphore: Can have a value greater than 1. It is used to control access to a finite number of resources.",
    },
    {
      question: "What is Kernel and write its main functions?",
      answer:
        "The kernel is the central component or module of an OS, responsible for managing and controlling all operations of computer systems and hardware. Main functions include managing resources, facilitating interaction between hardware and software, memory management, controlling peripherals, and scheduling CPU tasks.",
    },
    {
      question: "Write difference between micro kernel and monolithic kernel?",
      answer:
        "MicroKernel:\n- Kernel and user services in different address spaces.\n- Smaller in size and more modular.\n- Easier to extend and more reliable.\n- Uses message queues for inter-process communication.\n\nMonolithic Kernel:\n- Kernel and user services in the same address space.\n- Larger in size and less modular.\n- Harder to extend and system crashes if a service crashes.\n- Uses signals and sockets for inter-process communication.",
    },
    {
      question: "What is SMP (Symmetric Multiprocessing)?",
      answer:
        "SMP is a computer architecture where multiple processors share a common OS and memory, enabling any processor to handle any task. It improves reliability and efficiency by allowing simultaneous processing and resource sharing.",
    },
    {
      question: "What is a time-sharing system?",
      answer:
        "A time-sharing system allows multiple users to access system resources from different locations simultaneously, by dividing CPU time into slots and allocating them to tasks. It enhances resource utilization and provides a multi-user environment.",
    },
    {
      question: "What is Context Switching?",
      answer:
        "Context switching is the process of saving the state of one process and loading the state of another, allowing a single CPU to handle multiple processes efficiently. It is essential for multitasking and efficient CPU utilization in modern OS.",
    },
    {
      question: "What is difference between Kernel and OS?",
      answer:
        "Kernel:\n- Central component managing all system operations.\n- Acts as an interface between hardware and applications.\n\nOperating System:\n- System software providing an interface for user interaction.\n- Manages system resources and provides security, access control, and privacy.",
    },
    {
      question: "What is the difference between process and thread?",
      answer:
        "Process:\n- Independent program in execution with its own memory space.\n- Heavy-weight, requiring more resources and time to create.\n- Does not share data with other processes.\n\nThread:\n- Lightweight component of a process, sharing memory and data with other threads.\n- Requires fewer resources and is faster to create and terminate.\n- Enables parallelism within a process.",
    },
    {
      question: "What are various sections of the process?",
      answer:
        "There are four sections in a process:\n\n1. Stack: For local variables and return addresses.\n2. Heap: For dynamic memory allocation.\n3. Data: Stores global and static variables.\n4. Code/Text: Contains the compiled program code.",
    },
    {
      question:
        "What is a deadlock in OS? What are the necessary conditions for a deadlock?",
      answer:
        "A deadlock is a situation where a set of processes are blocked, each holding resources and waiting for others to release resources. Necessary conditions for deadlock are mutual exclusion, hold and wait, no pre-emption, and circular wait.",
    },
    {
      question: "What do you mean by Belady’s Anomaly?",
      answer:
        "Belady’s Anomaly is a phenomenon where increasing the number of frames in memory increases the number of page faults, typically occurring with FIFO page replacement algorithms.",
    },
    {
      question: "What is spooling in OS?",
      answer:
        "Spooling stands for Simultaneous Peripheral Operations Online, referring to putting I/O job data in a buffer to mediate between the computer application and slow peripherals. It facilitates efficient data processing and overlaps I/O operations with CPU tasks.",
    },
    {
      question: "What is thrashing in OS?",
      answer:
        "Thrashing refers to excessive paging or swapping activity leading to a decrease in system performance. It occurs when the system spends more time swapping pages between main memory and disk than executing tasks, usually due to insufficient memory.",
    },
    {
      question: "What is the main objective of multiprogramming?",
      answer:
        "The main objective of multiprogramming is to maximize CPU utilization by allowing multiple programs to run concurrently on a single processor, minimizing idle CPU time and efficiently using main memory.",
    },
    {
      question: "What do you mean by asymmetric clustering?",
      answer:
        "Asymmetric clustering is a type of clustering where one node remains in hot standby mode, ready to take over operations in case of failure, while other active nodes run different applications. It ensures high availability by minimizing downtime.",
    },
    {
      question:
        "What is the difference between multitasking and multiprocessing OS?",
      answer:
        "Multitasking OS allows multiple tasks to run concurrently on a single processor by time-sharing, giving the illusion of parallel execution. Multiprocessing OS uses multiple CPUs to execute multiple tasks simultaneously, improving overall system performance and throughput.",
    },
    {
      question: "What do you mean by Sockets in OS?",
      answer:
        "Sockets refer to endpoints for interprocess communication (IPC) across a network. Identified by an IP address and port number, they are used to establish connections and exchange data between processes on the same or different computers.",
    },
    {
      question: "Explain zombie process?",
      answer:
        "A zombie process, or defunct process, is one that has completed execution but still has an entry in the process table. Its entry remains to allow its parent process to read its exit status. Zombie processes do not consume system resources but indicate inefficiencies in process management if they accumulate excessively.",
    },
    {
      question: "What do you mean by cascading termination?",
      answer:
        "Cascading termination refers to a scenario where if a parent process exits or terminates, all its child processes are also terminated by the operating system, ensuring no child processes continue execution after the parent has terminated.",
    },
    {
      question: "What is starvation and aging in OS?",
      answer:
        "Starvation occurs when a low priority process waits indefinitely for resources due to higher priority processes continuously occupying them. Aging is a technique to prevent starvation by gradually increasing the priority of waiting processes over time.",
    },
    {
      question: "What is the difference between paging and segmentation?",
      answer:
        "Paging divides processes into fixed-size pages for efficient use of physical memory, but can lead to internal fragmentation. Segmentation divides processes into variable-sized segments based on logical units, allowing flexible memory allocation but can lead to external fragmentation.",
    },
    {
      question: "What is virtual memory?",
      answer:
        "Virtual memory is a memory management technique that provides an illusion of a larger memory than physically available by temporarily transferring data from RAM to disk storage. It helps in efficient memory allocation, process isolation, and protection.",
    },
    {
      question: "What is thread in OS?",
      answer:
        "A thread is a basic unit of CPU utilization, consisting of a program counter, a stack, and a set of registers. Threads share the same memory space and resources within a process, enabling concurrent execution and improving application performance.",
    },
    {
      question:
        "What is a process? What are the different states of a process?",
      answer:
        "A process is an instance of a computer program that is being executed. Process states:\n\n1. New: The process is being created.\n2. Running: Instructions are being executed.\n3. Waiting: The process is waiting for an event.\n4. Ready: The process is waiting to be assigned to a processor.\n5. Terminated: The process has finished execution.",
    },
    {
      question: "What do you mean by FCFS?",
      answer:
        "FCFS (First Come, First Served) is a scheduling algorithm that executes processes in the order they arrive. It is non-preemptive, meaning once a process starts executing, it continues until it completes or blocks. FCFS scheduling is simple to implement but may lead to inefficient use of CPU time if long processes arrive first.",
    },
    {
      question: "What is Reentrancy?",
      answer:
        "Reentrancy refers to the ability of a program to execute multiple instances of the same function simultaneously, without interference between them. Reentrant functions do not modify their own code or data, making them safe for concurrent execution by multiple threads or processes.",
    },
    {
      question:
        "What is a Scheduling Algorithm? Name different types of scheduling algorithms.",
      answer:
        "A scheduling algorithm manages the execution of processes or threads to maximize system performance and user responsiveness. Types of scheduling algorithms:\n\n1. FCFS (First Come, First Served)\n2. SJF (Shortest Job First)\n3. SRTF (Shortest Remaining Time First)\n4. Round Robin\n5. Priority Scheduling\n6. Multilevel Queue Scheduling\n7. Multilevel Feedback Queue Scheduling\n\nEach algorithm has its advantages and disadvantages, making them suitable for different types of applications and workloads.",
    },
  ],
};

async function putOperatingSystemQuestions() {
  const response = await db.insert(DefaultTable).values({
    questionAnswer: JSON.stringify(OperatingSystemQuestions),
    topicName: "OperatingSystem",
    createdAt: moment().format("DD-MM-yyyy"),
    mockId: uuidv4(),
  });
  console.log(response);
}

export default putOperatingSystemQuestions;
