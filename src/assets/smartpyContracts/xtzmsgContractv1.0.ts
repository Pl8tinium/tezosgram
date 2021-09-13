export class XtzMsgOnChainContract {
    public static currentVersion: object[] = [
        { "prim": "storage", "args": [{ "prim": "pair", "args": [{ "prim": "string", "annots": ["%channelName"] }, { "prim": "string", "annots": ["%lastMsg"] }] }] },
        { "prim": "parameter", "args": [{ "prim": "string", "annots": ["%addMsg"] }] },
        {
            "prim": "code",
            "args": [[{ "prim": "UNPAIR" }, { "prim": "UPDATE", "args": [{ "int": "2" }] }, { "prim": "NIL", "args": [{ "prim": "operation" }] }, { "prim": "PAIR" }]]
        }
    ];
}




// import smartpy as sp

// class Xtzmsg(sp.Contract):
//     def __init__(self, channelN):
//         self.init(channelName = channelN, lastMsg = "")

//     @sp.entry_point
//     def addMsg(self, msg):
//         self.data.lastMsg = msg

// if "templates" not in __name__:
//     @sp.add_test(name = "Test messages")
//     def test():
//         scenario = sp.test_scenario()
//         c1 = Xtzmsg("Test channel name")
//         scenario += c1
//         scenario += c1.addMsg("A Message")
//         scenario += c1.addMsg("Another one")