import {User} from "../types/user"
import {book, cartBook} from "../types/book";
import {orderData} from "../types/OrderData";

export const UserArray: User[] = [
    {
        uid: 1,
        username: "chiikawa",
        avatar: "/src/profile/1.jpg",
        remainMoney: 2000,
        slogan: "let yourself go",

    },
    {
        uid: 2,
        username: "paradisekkmEDG",
        avatar: "/src/profile/2.jpg",
        remainMoney: 3000,
        slogan: "just take it easy",

    }
]

export const BookList: book[] =[
    {
        bid: 1,
        pic: "/src/book/1.jpg",
        name: "理想国",
        price: 12,
        author: "柏拉图",
        comment: "柏拉图在《理想国》中以故事为题材，叙述苏格拉底到贝尔斯祷神，归途被派拉麦克邀往家中，宾主滔滔谈论" +
            "起来。两人的辩论从各个角度暴露奴隶主阶级的哲学思想、政治思想、艺术思想及教育思想。故事中的苏格拉底" +
            "是虚拟的、假托的，实际上就是柏拉图的代言人。文中借苏格拉底之口和人讨论正义，分析个人正义与城邦正义" +
            "之间的互通性，系统地阐述了正义的概念。柏拉图设计并展望着心目中理想国度的蓝图，提出在“理想国”中才能" +
            "真正实现正义。",

        tag: "哲学",
        sales: 200},
    {
        bid: 2,
        pic: "/src/book/2.jpg",
        name: "深入理解计算机系统",
        price: 12,
        author: "unknown",
        comment: "2002 年 8 月本书第 1 版首次印刷。一个月之后，我在复旦大学软件学院开设了“计算机系统基础”课程，" +
            "成为国内第一个采用这本教材授课的老师。这本教材有四个特点。第一，涉及面广，覆盖了二进制、汇编、组成" +
            "、体系结构、操作系统、网络与并发程序设计等计算机系统最重要的方面。第二，具有相当的深度，本书从程序" +
            "出发逐步深人到系统领域的重要问题，而非点到为止，学完本书后读者可以很好地理解计算机系统的工作原理。" +
            "第三，它是面向低年级学生的教材，在过去的教学体系中这本书所涉及的很多内容只能在高年级讲授，而本书" +
            "通过合理的安排将计算机系统领域最核心的内容巧妙地展现给学生（例如，不需要掌握逻辑设计与硬件描述语" +
            "言的完整知识，就可以体验处理器设计）。第四，本书配备了非常实用、有趣的实验。例如，模仿硬件仅用位操" +
            "作完成复杂的运算，模仿 tracker 和 hacker 去破解密码以及攻击自身的程序，设计处理器，实现简单但功" +
            "能强大的 Shell 和 Proxy 等。这些实验既强化了学生对书本知识的理解，也进一步激发了学生探究计算机系统的热情。",
        sales: 200,

        tag: "计算机科学",
    },
    {
        bid: 3,
        pic: "/src/book/3.jpg",
        name: "Javascript高级程序设计————第四版",
        price: 12,
        author: "unknown",
        comment:  "本书是 JavaScript 经典图书的新版。第 4 版涵盖 ECMAScript 2019，全面、深入地介绍了 JavaScript " +
            "开发者必须掌握的前端开发技术，涉及 JavaScript 的基础特性和高级特性。书中详尽讨论了 JavaScript 的" +
            "各个方面，从 JavaScript 的起源开始，逐步讲解到新出现的技术，其中重点介绍 ECMAScript 和 DOM 标准。" +
            "在此基础上，接下来的各章揭示了 JavaScript 的基本概念，包括类、期约、迭代器、代理，等等。另外，书中深" +
            "入探讨了客户端检测、事件、动画、表单、错误处理及 JSON。本书同时也介绍了近几年来涌现的重要新规范，包括 " +
            "Fetch API、模块、工作者线程、服务线程以及大量新 API",
        sales: 400,
        tag: "计算机科学 语言",

    },
    {
        bid: 4,
        pic: "/src/book/4.jpg",
        name: "三体",
        price: 12,
        author: "刘慈欣",
        comment: "作品讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。《三体》的文本叙事在" +
            "“后人类”的思考上有着重大突破，构建了科学与文学的互动范式，将道德内涵引入对科技的辩证思考中，并以文学手" +
            "段在文化语境中对科技进行大胆假设和重构，但科技核心只是一个叙事跳板，是完成现实超越的重要媒介，也是人类命" +
            "运共同体书写的重要工具。《三体》最吸引人的地方在于通过对人类中心主义的解构，继而完成对人与自然、动物之间" +
            "的伦理反思与文学表达，最终指向去人类中心化的思想内核。",
        sales: 600,

        tag: "科幻",
    },
    {
        bid: 5,
        pic: "/src/book/5.jpg",
        name: "C++ Primer plus",
        price: 12,
        author: "unknown",
        comment: "《C++ Primer Plus（第6版）中文版》分18章，分别介绍了C++程序的运行方式、基本数据类型、复合数据类型、" +
            "循环和关系表达式、分支语句和逻辑运算符、函数重载和函数模板、内存模型和名称空间、类的设计和使用、多态、虚" +
            "函数、动态内存分配、继承、代码重用、友元、异常处理技术、string类和标准模板库、输入/输出、C++11新增功能等内容。",

        tag: "语言 计算机科学",
        sales: 100,
    },
    {
        bid: 6,
        pic: "/src/book/6.jpg",
        name: "Modern OS",
        price: 12,
        author: "陈海波 夏虞斌",
        comment: "当看到上海交通大学陈海波教授、夏虞斌副教授等的著作《现代操作系统：原理与实现》这本教材时，内心满是钦佩与敬意。" +
            "过去一直采用国外的操作系统教材，很高兴看到终于有国内学者编写的重量级操作系统教材——全书共有24章、800多页，这" +
            "是迄今为止我所看到的知识最全面、内容最前沿、实践最重视的一本操作系统教材了。 相信不管是新入门的本科生，还是业" +
            "界的资深专家，都能从这本教材中学习到新知识。（节选自包老师微博。）",

        tag: "计算机科学 操作系统",
        sales: 600,
    },
]
export const Cart : cartBook[] = [
    {
        number: 1,
        book: BookList[0],
        selected: false
    },
    {
        number: 2,
        book: BookList[1],
        selected: false
    },
]
export const carouselData = [
    {name:"三体" , price: 12, number: 1, id: 1, src: "/src/book/1.jpg", detail: "作品讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。《三体》的文本叙事在" +
            "“后人类”的思考上有着重大突破，构建了科学与文学的互动范式，将道德内涵引入对科技的辩证思考中，并以文学手" +
            "段在文化语境中对科技进行大胆假设和重构，但科技核心只是一个叙事跳板，是完成现实超越的重要媒介，也是人类命" +
            "运共同体书写的重要工具。《三体》最吸引人的地方在于通过对人类中心主义的解构，继而完成对人与自然、动物之间" +
            "的伦理反思与文学表达，最终指向去人类中心化的思想内核。"},
    {name: "CSAPP", price: 12, number: 1, id: 2, src: "/src/book/2.jpg", detail: "2002 年 8 月本书第 1 版首次印刷。一个月之后，我在复旦大学软件学院开设了“计算机系统基础”课程，" +
            "成为国内第一个采用这本教材授课的老师。这本教材有四个特点。第一，涉及面广，覆盖了二进制、汇编、组成" +
            "、体系结构、操作系统、网络与并发程序设计等计算机系统最重要的方面。第二，具有相当的深度，本书从程序" +
            "出发逐步深人到系统领域的重要问题，而非点到为止，学完本书后读者可以很好地理解计算机系统的工作原理。" +
            "第三，它是面向低年级学生的教材，在过去的教学体系中这本书所涉及的很多内容只能在高年级讲授，而本书" +
            "通过合理的安排将计算机系统领域最核心的内容巧妙地展现给学生（例如，不需要掌握逻辑设计与硬件描述语" +
            "言的完整知识，就可以体验处理器设计）。第四，本书配备了非常实用、有趣的实验。例如，模仿硬件仅用位操" +
            "作完成复杂的运算，模仿 tracker 和 hacker 去破解密码以及攻击自身的程序，设计处理器，实现简单但功" +
            "能强大的 Shell 和 Proxy 等。这些实验既强化了学生对书本知识的理解，也进一步激发了学生探究计算机系统的热情。", }
];
export const rankingData = [{number: 800, name: "三体"},
    {number: 740, name: "1"},
    {number: 700, name: "2"},
    {number: 600, name: "3"},
    {number: 550, name: "4"},
    {number: 500, name: "5"},
    {number: 450, name: "6"},
    {number: 400, name: "7"},
    {number: 350, name: "8"},
    {number: 300, name: "9"},];

