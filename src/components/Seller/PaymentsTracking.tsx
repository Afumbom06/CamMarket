import { useState } from 'react';
import { Wallet, ArrowDownToLine, ArrowUpRight, DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner@2.0.3';

interface PaymentsTrackingProps {
  language: 'en' | 'fr';
  payments: {
    walletBalance: number;
    pendingBalance: number;
    totalEarnings: number;
    transactions: Array<{
      id: string;
      date: string;
      amount: number;
      status: 'pending' | 'completed' | 'failed';
      method: string;
      type: 'sale' | 'withdrawal';
      reference: string;
    }>;
  };
  onWithdraw: (data: { provider: string; phone: string; amount: number }) => void;
}

export function PaymentsTracking({ language, payments, onWithdraw }: PaymentsTrackingProps) {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    provider: 'mtn',
    phone: '',
    amount: 0,
  });

  const handleWithdrawSubmit = () => {
    if (!withdrawData.phone || withdrawData.amount <= 0) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'Veuillez remplir tous les champs');
      return;
    }

    if (withdrawData.amount > payments.walletBalance) {
      toast.error(language === 'en' ? 'Insufficient balance' : 'Solde insuffisant');
      return;
    }

    onWithdraw(withdrawData);
    setWithdrawDialogOpen(false);
    setWithdrawData({ provider: 'mtn', phone: '', amount: 0 });
    toast.success(language === 'en' ? 'Withdrawal request submitted' : 'Demande de retrait soumise');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        label: language === 'en' ? 'Pending' : 'En attente', 
        className: 'bg-yellow-100 text-yellow-700',
        icon: Clock 
      },
      completed: { 
        label: language === 'en' ? 'Completed' : 'Complété', 
        className: 'bg-green-100 text-green-700',
        icon: CheckCircle2
      },
      failed: { 
        label: language === 'en' ? 'Failed' : 'Échoué', 
        className: 'bg-red-100 text-red-700',
        icon: XCircle
      },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">
          {language === 'en' ? 'Payments & Earnings' : 'Paiements et Revenus'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Manage your earnings and withdrawals' 
            : 'Gérez vos revenus et retraits'}
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">
                  {language === 'en' ? 'Available Balance' : 'Solde Disponible'}
                </p>
                <p className="text-3xl mb-2">
                  {payments.walletBalance.toLocaleString()} FCFA
                </p>
                <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-white text-green-600 hover:bg-green-50 gap-2"
                    >
                      <ArrowDownToLine className="h-4 w-4" />
                      {language === 'en' ? 'Withdraw' : 'Retirer'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {language === 'en' ? 'Request Withdrawal' : 'Demander un Retrait'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{language === 'en' ? 'Mobile Money Provider' : 'Fournisseur Mobile Money'}</Label>
                        <Select value={withdrawData.provider} onValueChange={(value) => setWithdrawData({ ...withdrawData, provider: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                            <SelectItem value="orange">Orange Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}</Label>
                        <Input
                          placeholder="+237 6XX XXX XXX"
                          value={withdrawData.phone}
                          onChange={(e) => setWithdrawData({ ...withdrawData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'en' ? 'Amount (FCFA)' : 'Montant (FCFA)'}</Label>
                        <Input
                          type="number"
                          placeholder="50000"
                          value={withdrawData.amount || ''}
                          onChange={(e) => setWithdrawData({ ...withdrawData, amount: Number(e.target.value) })}
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'en' ? 'Available:' : 'Disponible:'} {payments.walletBalance.toLocaleString()} FCFA
                        </p>
                      </div>
                      <Button 
                        onClick={handleWithdrawSubmit} 
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {language === 'en' ? 'Submit Request' : 'Soumettre la Demande'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Pending Balance' : 'Solde en Attente'}
                </p>
                <p className="text-3xl mb-2">
                  {payments.pendingBalance.toLocaleString()} FCFA
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Processing withdrawals' : 'Retraits en cours'}
                </p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Total Earnings' : 'Revenus Totaux'}
                </p>
                <p className="text-3xl mb-2">
                  {payments.totalEarnings.toLocaleString()} FCFA
                </p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {language === 'en' ? 'All time' : 'Tout le temps'}
                </p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Transaction History' : 'Historique des Transactions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Transaction ID' : 'ID Transaction'}</TableHead>
                  <TableHead>{language === 'en' ? 'Date' : 'Date'}</TableHead>
                  <TableHead>{language === 'en' ? 'Type' : 'Type'}</TableHead>
                  <TableHead>{language === 'en' ? 'Method/Reference' : 'Méthode/Référence'}</TableHead>
                  <TableHead>{language === 'en' ? 'Amount' : 'Montant'}</TableHead>
                  <TableHead>{language === 'en' ? 'Status' : 'Statut'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {transaction.type === 'sale' 
                          ? (language === 'en' ? 'Sale' : 'Vente')
                          : (language === 'en' ? 'Withdrawal' : 'Retrait')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.method}</TableCell>
                    <TableCell className={`text-sm ${
                      transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'sale' ? '+' : '-'}{transaction.amount.toLocaleString()} FCFA
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
