import {Socket, Presence} from "phoenix";

let socket = new Socket("ws://127.0.0.1:4000/socket", {params: {token: ""}})

socket.connect()

let channel = null;
let setBody = null;
let presence = null;
let setParticipants = null;

function body_update(resp) {
    console.log(resp);
    setBody(resp.body);
}

function participants_update(participants) {
    console.log('here');
    console.log(participants);
    setParticipants(participants);
}

export function ch_join(name, sb, sli, sp) {
    channel = socket.channel("lobby:1", {name: name});
    presence = new Presence(channel);

    presence.onSync(() => {
        participants_update(presence.list().map(p => p.metas[0]));
    });

    setBody = sb;
    setParticipants = sp;

    channel.join()
        .receive("ok", (resp) => {
            body_update(resp);
            sli(true)
        })
        .receive("error", resp => {console.log("unable to join:", resp)});
    
    channel.on("updated", body_update);
}

export function ch_update(body) {
    channel.push("update", {body: body});
}

export function ch_leave() {
    channel.leave();
}

export function ch_stop_typing() {
    channel.push("stoptyping", null)
}