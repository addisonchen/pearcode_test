import {Socket, Presence} from "phoenix";

let socket = new Socket("ws://127.0.0.1:4000/socket", {params: {token: ""}})

socket.connect()

let channel = null;
let setBody = null;
let presence = null;
let setParticipants = null;
let setExecuting = null;
let setResult = null;
let setLanguage = null;

function body_update(resp) {
    //console.log(resp);
    setBody(resp.body);
}

function participants_update(participants) {
    //console.log('here');
    //console.log(participants);
    setParticipants(participants);
}

function executing_update(executing) {
    setExecuting(executing);
}

function set_result(result) {
    setResult(result)
}

function set_language(language) {
    setLanguage(language)
}

export function ch_join(name, sb, sli, sp, ex, sr, sl) {
    channel = socket.channel("lobby:1", {name: name});
    presence = new Presence(channel);

    presence.onSync(() => {
        participants_update(presence.list().map(p => p.metas[0]));
    });

    setBody = sb;
    setParticipants = sp;
    setExecuting = ex;
    setResult = sr;
    setLanguage = sl;

    channel.join()
        .receive("ok", (resp) => {
            body_update(resp);
            sli(true)
        })
        .receive("error", resp => {console.log("unable to join:", resp)});
    
    channel.on("updated", body_update);
    channel.on("executing", () => {
        executing_update(true);
    });
    channel.on("submission_result", (resp) => {
        executing_update(false);
        set_result(resp)
    });
    channel.on("new_language", (resp) => {
        set_language(resp["language"])
    })
}

export function ch_update(body) {
    channel.push("update", {body: body});
}

export function ch_leave() {
    channel.leave();
}

export function ch_stop_typing() {
    channel.push("stoptyping", null);
}

export function ch_execute(language) {
    channel.push("execute", {language: language});
}

export function ch_language(language) {
    channel.push("set_language", {language: language});
}
