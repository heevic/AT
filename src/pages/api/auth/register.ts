import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from "next";
import {connectDB} from "@/utils/mongoDb";
import {
    hasValidPasswordLength,
    isValidEmailFormat,
    hasValidName,
    hasBirthValid,
    hasValidNickName, hasValidPhone
} from '@/utils/validation/validation';


const handlerRegister = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    /* POST 요청 처리 */
    if (request.method === 'POST') {
        const {email, password, name, nickname, birth, phone} = request.body;


        /* 이메일 유효성 검사 */
        if (!isValidEmailFormat(email)) {
            response.status(400).json({message: '사용할 수 없는 이메일입니다.'});
            return;
        }


        /* 비밀번호 유효성 검사 */
        if (!hasValidPasswordLength(password)) {
            response.status(400).json({message: '사용할 수 없는 비밀번호입니다.'});
            return;
        }


        /* 닉네임 유효성 검사 */
        if (!hasValidName(name)) {
            response.status(400).json({message: '사용할 수 없는 닉네임입니다.'});
            return;
        }


        /* 생년월일 유효성 검사 */
        if (!hasBirthValid(birth)) {
            response.status(400).json({message: '생년월일 : 필수 입력사항입니다.'});
            return;
        }

        /* 닉네임 유효성 검사 */
        if (!hasValidNickName(nickname)) {
            response.status(400).json({message: '닉네임 : 필수 입력사항입니다.'});
            return;
        }

        /* 닉네임 유효성 검사 */
        if (!hasValidPhone(phone)) {
            response.status(400).json({message: '휴대전화번호 : 필수 입력사항입니다.'});
            return;
        }


        try {
            let db = (await connectDB).db('forum');
            /* 비밀번호 해시값으로 변경 & DB 추가 */
            let passwordHash: string = await bcrypt.hash(request.body.password, 10)
            await db.collection('user_card').insertOne({
                ...request.body, password: passwordHash, role: 'customer'
            });

            /* Response */
            response.status(200).json({message: '회원가입이 정상적으로 처리되었습니다.'});

        } catch (error) {
            response.status(500).json({message: '인터넷 또는 서버 오류 발생'});
        }
    }
}

export default handlerRegister;