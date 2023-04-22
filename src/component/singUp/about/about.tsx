import { useEffect, useState } from 'react';

import { Textarea } from "../../layout/textarea/textarea";
import { Select } from "../../layout/select/select";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { useInputText } from "../../../hooks/useInputText";

import { apiRequest } from "../../../api/apiRequest";

import { useNavigate } from "react-router-dom";
import { selectUserId, selectUserRole } from "../../../redux/user/userSlice";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { maritalStatus, schoolStatus } from "../../../misc/translate";

export function About (): JSX.Element {
  const userId = useTypedSelector(selectUserId);
  const userRole = useTypedSelector(selectUserRole);

  const { data, edit } = useInputText({ height: 1, weight: 1 });

  const [message, setMessage] = useState('');

  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.about === '' ||
        data.aboutPerson === '' ||
        data.school === '' ||
        data.profession === '' ||
        data.maritalStatus === '' ||
        data.trueInformation === '' ||
        data.children === '') { setDisabled(true); return; }

    setDisabled(false);
  }, [data]);

  async function sendData (e: any): Promise<void> {
    e.preventDefault();

    const response = await apiRequest(`/api/add/${userRole}About`, 'post', {
      [userRole === 'lady' ? 'ladyId' : 'gentlemanId']: userId,
      about: data.about,
      aboutThePerson: data.aboutPerson,
      height: Number(data.height),
      weight: Number(data.weight),
      education: schoolStatus[data.school],
      profession: data.profession,
      maritalStatus: maritalStatus[data.maritalStatus],
      children: Number(data.children),
      language: data.languages,
      true_information: data.trueInformation
    }, userRole);

    if (response.status !== 'error') { navigate('/', { replace: true }); return; }
    setMessage('Doslo je do greske!')
  }

  return (
        <section id="about">
          <h1>O vama</h1>
          <form>
            <div className="message">
                <span className='important-message'>{message}</span>
            </div>
            <Textarea required onChange={edit} title={"Napisite nesto o vama (budite iskreni):"} id={"about"} />
            <Textarea required onChange={edit} title={"Koga zelite da upoznate?"} id={"aboutPerson"} />
            <div className="radio-inputs">
                <Select title={"Visina:"} id={"height"} options={[...Array.from({ length: 81 }, (_, i) => i + 150)]} onChange={edit} />
                <Select title={"Tezina:"} id={"weight"} options={[...Array.from({ length: 181 }, (_, i) => i + 40)]} onChange={edit} />
                <Select required title={"Skola:"} id={"school"} options={['', 'Osnovna skola', 'Srednja skola', 'Fakultet']} onChange={edit} />
            </div>
            <Input required onChangeInput={edit} name={'profession'} id={"profession"} title={"Zanimanje:"} />
            <div className="radio-inputs">
                <Select required title={"Bracni status:"} id={"maritalStatus"} options={['', 'Slobodan/na', 'U vezi', 'U braku', 'U braku, ali', 'Komplikovano']} onChange={edit} />
                <Select required title={"Imate dece:"} id={"children"} options={['', ...Array.from(Array(6).keys())]} onChange={edit} />
            </div>
            <Input onChangeInput={edit} name={'languages'} id={"languages"} title={"Koje jezike govorite:"} />
            <label>Da li su ovo tacne informacije?</label>
            <Input required id="1" name='trueInformation' title="Da, tacne informacije!" onChangeInput={edit} type='radio'/>
            <Input required id="0" name='trueInformation' title="Ne, samo se zezam!" onChangeInput={edit} type='radio'/>
            <div className="submit-button">
                <Button disabled={disabled} type="submit" title={"Posalji"} onClickFunction={sendData} />
            </div>
          </form>
        </section>
  )
}
