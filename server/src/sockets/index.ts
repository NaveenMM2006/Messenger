import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) =>{
    io = new Server(server,{
        cors : {
            origin : "*",
            methods : ["GET","POST"],
        },
    });

    io.on("Connection", (socket)=>{
        console.log("User connected : ",socket.id);

        socket.on(
            "join-channel",
            (channelId: string) => {
                socket.join(channelId);

                console.log(`Joined Channel : ${channelId}`);
            }
        );
        socket.on("Disconnect",()=>{
            console.log("User Disconnected : ",socket.id);
        });
    });
    return io;
};

export const getIO = () => io;