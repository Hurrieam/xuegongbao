import {Model, Op} from "sequelize";
import {User} from "../dao/_init";
import {IModel} from "../types";

/**
 * 根据 fingerprint 查询用户信息，并将其添加到 rows 中
 * @param rows
 */
export const wrapWithOwner = async (rows: Model<any, any>[] | IModel[]) => {
    const fingerprints: string[] = rows.map((item) => item.getDataValue("fingerprint"));
    const users = await User.findAll({
            where: {
                fingerprint: {
                    [Op.in]: fingerprints
                }
            }
        }
    );

    rows.forEach((item) => {
        const fingerprint = item.getDataValue("fingerprint");
        const user = users.find((user) => user.getDataValue("fingerprint") === fingerprint);
        item.setDataValue("owner", user);
    });
}