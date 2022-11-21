"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solution(id_list, report, k) {
    const userList = id_list.map((item) => {
        return {
            userID: item,
            banList: [],
        };
    });
    const banList = [];
    const banUserList = [];
    const result = [];
    report.forEach((item) => {
        const [user, banUser] = item.split(" ");
        const target = userList.find((item) => item.userID === user);
        if (!(target === null || target === void 0 ? void 0 : target.banList.includes(banUser))) {
            target === null || target === void 0 ? void 0 : target.banList.push(banUser);
            banList.push(banUser);
        }
    });
    id_list.forEach((item) => {
        const cnt = banList.filter((ban) => item === ban).length;
        if (cnt >= k) {
            banUserList.push(item);
        }
    });
    userList.forEach((item) => {
        let cnt = 0;
        item.banList.forEach((item) => (banUserList.includes(item) ? cnt++ : cnt));
        result.push(cnt);
    });
    return result;
}
solution(["con", "ryan"], ["ryan con", "ryan con", "ryan con", "ryan con"], 3);
