import moment from "moment";
import { db } from "./db";
import { DefaultTable } from "./schema";
import { v4 as uuidv4 } from "uuid";

export const DatabaseManagementQuestions = {
  questions: [
    {
      question:
        "What is DBMS and what is its utility? Explain RDBMS with examples.",
      answer: `DBMS stands for Database Management System, which is a set of applications or programs that enable users to create and maintain a database. DBMS provides tools or interfaces for operations like inserting, deleting, updating, etc., in a database. It efficiently stores data compared to file-based systems, overcoming issues like data inconsistency and redundancy.
  
        Examples of DBMS include file systems, XML, Windows Registry, etc.
  
        RDBMS stands for Relational Database Management System introduced in the 1970s. It stores data in tables, making it more efficient than DBMS. Examples include MySQL, Oracle DB, etc.`,
    },
    {
      question: "What is a Database?",
      answer: `A Database is an organized, consistent, and logical collection of data that can be easily updated, accessed, and managed. It typically consists of tables or objects containing records and fields. Data is retrieved from a database using queries processed by a DBMS.`,
    },
    {
      question:
        "Mention the issues with traditional file-based systems that make DBMS a better choice?",
      answer: `Traditional file-based systems lack indexing, leading to slow data access. They suffer from redundancy, inconsistency, and poor data organization. They also lack concurrency control and struggle with integrity, isolation, atomicity, and security compared to DBMS.`,
    },
    {
      question: "Explain a few advantages of a DBMS.",
      answer: `Advantages of DBMS include:
  
        - **Data Sharing:** Allows multiple users to access and share data simultaneously.
        - **Integrity Constraints:** Ensures data is stored in a structured and refined manner.
        - **Redundancy Control:** Eliminates redundancy by integrating data into a single database.
        - **Data Independence:** Enables changes in data structure without affecting applications.
        - **Backup and Recovery:** Automates backup creation and data restoration.
        - **Data Security:** Provides tools like authentication and encryption for secure data storage and transfer.`,
    },
    {
      question: "Explain different languages present in DBMS.",
      answer: `DBMS includes several languages:
  
        - **DDL (Data Definition Language):** Commands for defining database structure (e.g., CREATE, ALTER, DROP).
        - **DML (Data Manipulation Language):** Commands for manipulating data (e.g., SELECT, UPDATE, INSERT, DELETE).
        - **DCL (Data Control Language):** Commands for user permissions and controls (e.g., GRANT, REVOKE).
        - **TCL (Transaction Control Language):** Commands for managing transactions (e.g., COMMIT, ROLLBACK, SAVEPOINT).`,
    },
    {
      question: "What is meant by ACID properties in DBMS?",
      answer: `ACID properties are essential for ensuring reliable and consistent transactions in DBMS:
  
        - **Atomicity:** Ensures that transactions are either fully completed or fully rolled back if an error occurs.
        - **Consistency:** Guarantees that data remains consistent before and after transactions.
        - **Isolation:** Ensures that transactions are isolated from each other until they are completed to prevent interference.
        - **Durability:** Ensures that committed transactions are permanently saved and not lost, even in case of system failures.`,
    },
    {
      question:
        "Are NULL values in a database the same as that of zero or blank space?",
      answer: `No, a NULL value is very different from that of zero and blank space as it represents a value that is assigned, unknown, unavailable, or not applicable compared to blank space which represents a character and zero represents a number.
  
        Example: NULL value in “number_of_courses” taken by a student represents that its value is unknown whereas 0 in it means that the student hasn’t taken any courses.`,
    },
    {
      question:
        "What is an entity-relationship (E-R) model? Explain the terms Entity, Entity Type, and Entity Set in DBMS.",
      answer: `An entity-relationship model is a diagrammatic approach to database design where real-world objects are represented as entities and relationships between them are depicted.
  
        - **Entity:** A real-world object with attributes that describe its characteristics (e.g., student, employee).
        - **Entity Type:** A collection of similar entities sharing the same attributes (e.g., all students).
        - **Entity Set:** The set of all entities of a particular entity type in a database (e.g., all students in a university).`,
    },
    {
      question: "What is meant by normalization and denormalization?",
      answer: `**Normalization:** A process to reduce redundancy and improve data integrity by organizing data into tables. It involves breaking down a large table into smaller ones and defining relationships between them.
  
        **Denormalization:** Reversing normalization to combine normalized tables into one for faster data retrieval. It involves adding redundant data to improve query performance at the cost of data integrity and storage space.`,
    },
    {
      question:
        "What is a database lock? Explain the major difference between a shared lock and an exclusive lock during a transaction in a database.",
      answer: `**Database Lock:** A mechanism to control data concurrency and ensure data consistency by managing access to shared data.
  
        - **Shared Lock:** Allows multiple transactions to read but not modify data concurrently.
        - **Exclusive Lock:** Restricts other transactions from reading or writing data until the lock holder completes their transaction. Prevents data inconsistency during updates.`,
    },
    {
      question:
        "Explain the difference between the DELETE and TRUNCATE command in a DBMS.",
      answer: `**DELETE Command:**
        - Deletes specific rows based on a condition.
        - Can be rolled back.
        - Slower due to logging individual row deletions.
  
        **TRUNCATE Command:**
        - Deletes all rows from a table.
        - Cannot be rolled back (in most databases).
        - Faster as it deallocates data pages without logging individual row deletions.`,
    },
    {
      question:
        "Explain the difference between intension and extension in a database.",
      answer: `**Intension:** Database schema that defines the structure, constraints, and relationships of the data.
  
        **Extension:** Actual data stored in the database at a specific point in time. It changes as data is added, modified, or deleted.`,
    },
    {
      question:
        "Explain different types of relationships amongst tables in a DBMS.",
      answer: `**Types of Relationships:**
        - **One-to-One:** One record in Table A is related to one record in Table B.
        - **One-to-Many:** One record in Table A is related to multiple records in Table B.
        - **Many-to-Many:** Multiple records in Table A are related to multiple records in Table B.
        - **Self-Referencing:** Records in Table A relate to other records within the same table (e.g., hierarchical structures).`,
    },
    {
      question: "Explain different levels of data abstraction in a DBMS.",
      answer: `**Data Abstraction Levels:**
        - **Physical Level:** Describes how data is stored and accessed at the lowest level (e.g., data storage details).
        - **Logical Level:** Represents the database structure from a developer's perspective, defining entities, attributes, and relationships.
        - **View Level:** Provides customized views of data to users, hiding complex queries and data structures.`,
    },
    {
      question: "What is Data Warehousing?",
      answer: `**Data Warehousing:** A process of collecting, organizing, and storing data from multiple sources into a centralized repository for analysis and reporting. It supports decision-making in organizations by providing historical and current data insights.`,
    },
    {
      question:
        "Explain the difference between a 2-tier and 3-tier architecture in a DBMS.",
      answer: `**2-Tier Architecture:**
        - Client-server model where client-side applications interact directly with the database server.
        - Examples: Simple desktop applications like contact management systems using MS Access.
  
        **3-Tier Architecture:**
        - Adds an application server between the client and database server for improved security, scalability, and manageability.
        - Examples: Web-based applications, e-commerce websites, enterprise resource planning (ERP) systems.`,
    },
  ],
};

async function putDatabaseManagementQuestions() {
  const response = await db.insert(DefaultTable).values({
    questionAnswer: JSON.stringify(DatabaseManagementQuestions),
    topicName: "DBMS",
    createdAt: moment().format("DD-MM-yyyy"),
    mockId: uuidv4(),
  });
  console.log(response);
}

export default putDatabaseManagementQuestions;
