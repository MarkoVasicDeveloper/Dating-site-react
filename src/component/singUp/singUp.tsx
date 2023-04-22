/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/apiRequest";
import { Button } from "../layout/button/button";
import { Calendar } from "../layout/calendar/calendar";
import { Checkbox } from "../layout/checkbox/checkbox";
import { Input } from "../layout/input/input";
import { Select } from "../layout/select/select";
import './singUp.scss';
import { useInputText } from "../../hooks/useInputText";
import { useDispatch } from "react-redux";
import { userData } from "../../redux/user/userSlice";

export function SingUp (): JSX.Element {
  const dispatch = useDispatch();

  const { data, edit } = useInputText({});

  const [date, setDate] = useState('') as any;
  const [policy, setPolicy] = useState({ value: '', checked: false });
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (data.username === '' ||
        data.password === '' ||
        data.email === '' ||
        data.city === '' ||
        data.state === '' ||
        !policy.checked ||
        date === '' ||
        data.role === '') { setDisabled(true); return; }

    setDisabled(false);
  }, [data, policy]);

  async function sendData (e: any): Promise<void> {
    e.preventDefault();
    setMessage('');

    const response = await apiRequest(`/api/add/${data.role}`, 'post', {
      username: data.username, password: data.password, email: data.email, city: data.city, state: data.state, rules: policy.checked ? '1' : '0', notifications: '1', dateOfBirth: date.toLocaleDateString()
    }, data.role);

    if (response.status === 'error') { setMessage('Something went wrong!'); return; }

    if (response.data.statusCode === -1001 || response.data.statusCode === -2001) { setMessage('Korisnicko ime je zauzeto ili je mejl vec iskoriscen!'); return; }

    dispatch(userData({
      id: data.role === 'lady' ? response.data.ladyId : response.data.gentlemanId,
      username: response.data.username,
      token: null,
      role: data.role,
      photosDestination: `${process.env.REACT_APP_BASE_URL}/assets/photo/${data.role === 'gentleman' ? 'Gentleman' : 'Lady'}`,
      usersPhotosDestination: `${process.env.REACT_APP_BASE_URL}/assets/photo/${data.role === 'gentleman' ? 'Lady' : 'Gentleman'}`
    }))

    navigate(`/singup/about`, { replace: true });
  }

  return (
    <section id="sing-up" >
      <h1>Kreiraj nalog</h1>

      <div className="form-container">
        <form>
          <div className="message">
              <span className='important-message'>{message}</span>
          </div>
          <Input required onChangeInput={edit} name={'username'} id={"username"} title={"Korisnicko ime:"} />
          <Input required type="password" onChangeInput={edit} name={'password'} id={"password"} title={"Lozinka:"} />
          <Input required onChangeInput={edit} name={'email'} id={"email"} title={"Imejl:"} />
          <Input required onChangeInput={edit} name={'city'} id={"city"} title={"Grad:"} />
          <Select required title={"Drzava:"} id={"state"} options={['', 'Srbija', 'Crna Gora', 'BIH', 'Slovenija', 'Hrvatska', 'Austrija', 'Ostalo']} onChange={edit} />
          <Calendar setDate={setDate} date={date} />
          <div className='radio-inputs'>
              <Input required id='lady' name='role' title='Dama:' onChangeInput={edit} type='radio' footnoteTitle='Izaberite ulogu!'/>
              <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={edit} type='radio' footnoteTitle='Izaberite ulogu!'/>
          </div>
          <Checkbox implementClass="warning" required id={"policy"} onChange={setPolicy} value={"policy"} title={"Prihvati uslove koriscenja"} />
          <div className="submit-button">
              <Button type="submit" title={"Nastavi"} onClickFunction={sendData} disabled={disabled} />
          </div>
        </form>
      </div>
    </section>
  )
}
