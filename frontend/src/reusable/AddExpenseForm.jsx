import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  useAddExpenseMutation,
  useSuggestCategoryMutation,
} from "@/features/api/expenseApi";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other",
];

const AddExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    text: "",
    amount: "",
    category: "",
    date: undefined,
  });

  const user = useUser();
  const userId = user?.user?.id;

  const [addExpense, { data, isLoading, isSuccess, error }] =
    useAddExpenseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.text &&
      formData.amount &&
      formData.category &&
      formData.date &&
      userId
    ) {
      const expenseData = {
        ...formData,
        amount: Number.parseFloat(formData.amount),
      };

      try {
        await addExpense({ userId, formData: expenseData }).unwrap();
        if (onAddExpense) {
          onAddExpense(expenseData);
        }
      } catch (err) {
        console.error("Failed to add expense:", err);
      }
    }
  };

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      setFormData({
        text: "",
        amount: "",
        category: "",
        date: undefined,
      });
      toast.success("Expense added successfully!");
    }
    if (error) {
      toast.error(
        `Error adding expense: ${error?.data?.error || "Unknown error"}`
      );
    }
  }, [isSuccess, error, data]);

  const [
    suggestCategory,
    { data: suggestedCategory, isLoading: isSuggesting },
  ] = useSuggestCategoryMutation();

  const handleSuggestCategory = async () => {
    if (!formData.text || formData.text.trim().length < 2) {
      toast.error("Enter a valid description first!");
      return;
    }
    try {
      const response = await suggestCategory(formData.text).unwrap();
      if (response?.category) {
        setFormData((prev) => ({
          ...prev,
          category: response.category,
        }));
        toast.success(`Suggested: ${response.category}`);
      } else {
        toast.error("No category suggestion available");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to suggest category");
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
          Add New Expense
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">
          Track your spending with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label
                htmlFor="description"
                className="text-xs sm:text-sm font-medium text-foreground"
              >
                Expense Description
              </Label>
              <Input
                id="text"
                placeholder="Coffee, groceries, gas..."
                value={formData.text}
                onChange={(e) => handleInputChange("text")(e.target.value)}
                className="bg-background border-border text-sm sm:text-base py-1.5 sm:py-2"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label
                htmlFor="date"
                className="text-xs sm:text-sm font-medium text-foreground"
              >
                Expense Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background border-border text-sm sm:text-base py-1.5 sm:py-2",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date
                      ? format(formData.date, "MM/dd/yyyy")
                      : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleInputChange("date")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label
                htmlFor="category"
                className="text-xs sm:text-sm font-medium text-foreground"
              >
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={handleInputChange("category")}
              >
                <SelectTrigger className="bg-background border-border text-sm sm:text-base py-1.5 sm:py-2">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleSuggestCategory}
                disabled={isSuggesting || !formData.text}
                className="w-full mt-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2"
              >
                {isSuggesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suggesting...
                  </>
                ) : (
                  "Suggest Category with AI"
                )}
              </Button>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label
                htmlFor="amount"
                className="text-xs sm:text-sm font-medium text-foreground"
              >
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  Rs
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="50"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount")(e.target.value)}
                  className="pl-8 bg-background border-border text-sm sm:text-base py-1.5 sm:py-2"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 sm:py-2.5"
            disabled={
              isLoading ||
              !formData.text ||
              !formData.amount ||
              !formData.category ||
              !formData.date
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            {isLoading ? "Adding..." : "Add Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddExpenseForm;