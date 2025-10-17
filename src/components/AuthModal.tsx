import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string, name: string) => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [step, setStep] = useState<'phone' | 'code' | 'name'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSendCode = async () => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length !== 11) {
      setError('Введите корректный номер телефона');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('code');
    } catch (err) {
      setError('Ошибка отправки кода. Попробуйте снова');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 4) {
      setError('Введите 4-значный код');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (code === '1234') {
        setStep('name');
      } else {
        setError('Неверный код. Попробуйте снова');
      }
    } catch (err) {
      setError('Ошибка проверки кода');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    if (name.trim().length < 2) {
      setError('Введите ваше имя');
      return;
    }

    onSuccess(phone, name);
    handleClose();
  };

  const handleClose = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    setName('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 'phone' && 'Вход на сайт'}
            {step === 'code' && 'Введите код из СМС'}
            {step === 'name' && 'Как вас зовут?'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'phone' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={18}
                  className="text-lg"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button 
                onClick={handleSendCode} 
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Отправка...' : 'Получить код'}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Мы отправим вам код подтверждения по СМС
              </p>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Код из СМС</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="____"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 4));
                    setError('');
                  }}
                  maxLength={4}
                  className="text-lg text-center tracking-widest"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button 
                onClick={handleVerifyCode} 
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Проверка...' : 'Подтвердить'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('phone')}
                className="w-full"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Изменить номер
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Код отправлен на {phone}
                <br />
                <span className="text-xs">(для теста используйте код: 1234)</span>
              </p>
            </>
          )}

          {step === 'name' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  className="text-lg"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button 
                onClick={handleComplete}
                className="w-full"
                size="lg"
              >
                Готово
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
